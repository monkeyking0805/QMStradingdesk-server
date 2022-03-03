'use strict'

const debug = require('debug')('qms-tradingdesk-server:controller:admin:events')
const error = require('debug')('qms-tradingdesk-server:controller:admin:events:error')
const paginateHelper = require('../../helpers/paginate')
const eventRepository = require('../../repositories/event')
const assetRepository = require('../../repositories/asset')
const codeTypeRepository = require('../../repositories/codeType')
const clubRepository = require('../../repositories/club')
const venueRepository = require('../../repositories/venue')
const regionRepository = require('../../repositories/region')
const listTransformer = require('../../transformers/events/list')
const { validation } = require('../../config/error')
const { processSimilarity, processBestMatch } = require('../../helpers/similarity')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')
const { validateDate } = require('../../helpers/validateField')
const { dateFormat } = require('../../environment/dateFormat')
const moment = require('moment')

module.exports = {
  create,
  view,
  update,
  list,
  del,
  archive,
  restore,
  validateImport
}

async function create (ctx, next) {
  debug(create.name)
  try {
    const created = await eventRepository.create(ctx.request.body)
    ctx.created(listTransformer.transformSingle(await eventRepository.findById(created.id)))
  } catch (err) {
    error(create.name, err)
    err.expose = true
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function view (ctx, next) {
  debug(view.name)
  try {
    ctx.ok(listTransformer.transformSingle(ctx.state.event))
  } catch (err) {
    error(view.name, err)
    err.expose = true
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function update (ctx, next) {
  debug(update.name)
  try {
    const { id } = ctx.params
    await eventRepository.update(id, ctx.request.body)
    ctx.ok(await eventRepository.findById(id))
  } catch (err) {
    error(update.name, err)
    err.expose = true
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

function getListParameters (ctx) {
  debug(getListParameters.name)
  const { page, itemsPerPage } = paginateHelper.getUrlParameters(ctx)
  const { order_by: orderBy } = ctx.request.query
  const {
    codes,
    venues,
    clubs,
    regions,
    startDate,
    endDate,
    name,
    archive
  } = ctx.request.body
  return {
    paging: {
      page,
      itemsPerPage
    },
    orderBy,
    conditions: {
      codes,
      venues,
      clubs,
      regions,
      startDate,
      endDate,
      name,
      archive
    }
  }
}

async function list (ctx, next) {
  debug(list.name)
  try {
    const params = getListParameters(ctx)
    const result = await eventRepository.list(params)
    result.rows = listTransformer.transform(result.rows)
    ctx.ok({
      ...result,
      parameters: {
        ...ctx.request.query,
        ...ctx.request.body
      }
    })
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}

async function del (ctx, next) {
  debug(del.name)
  try {
    const { id } = ctx.params
    // Check if Assets exist before update flag delete
    const assetDetail = await assetRepository.findBy({
      event_id: id
    })
    // if no asset exist then allow to update flag as delete
    // else return reponse error
    if (assetDetail.length === 0) {
      eventRepository.del(id)
      ctx.ok()
    } else {
      ctx.status = 409
      ctx.body = {
        message: validation.events.cannotDeleteLinkedEvents,
        statusCode: 409
      }
    }
  } catch (err) {
    error(del.name, err)
    err.expose = true
    throw err
  }
}

async function archive (ctx, next) {
  debug(update.name)
  try {
    const id = ctx.request.body.id
    const archiveEventResult = await eventRepository.archive(id)
    const assetsForArchivedEvent = await assetRepository.findByEventId(id)
    if (assetsForArchivedEvent && assetsForArchivedEvent.length !== 0) {
      const archiveRelatedAssets = assetsForArchivedEvent.map(async asset => {
        await assetRepository.archive(asset.id)
      })
      await Promise.all(archiveRelatedAssets)
    }
    ctx.ok(removeTimestamps(archiveEventResult))
  } catch (err) {
    error(update.name, err)
    databaseErrorHandling(err, 'events')
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function restore (ctx, next) {
  debug(update.name)
  try {
    const result = await eventRepository.restore(ctx.request.body.id)
    ctx.ok(removeTimestamps(result))
  } catch (err) {
    error(update.name, err)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function validateImport (ctx, next) {
  debug(validateImport.name)
  try {
    const rowResult = await processBulkImportEvent(ctx.request.body)
    // If validate pass then allow bulk upload
    if (rowResult.allowUpload) {
      rowResult.validatedResult.forEach(async result => {
        const request = {
          name: (result.fixtures.result[0]) ? result.fixtures.request : null,
          startDate: moment(result.startDate.request, dateFormat.importEventFormat).format(dateFormat.SQL_IMPORT_FORMAT).toString(),
          endDate: moment(result.endDate.request, dateFormat.importEventFormat).format(dateFormat.SQL_IMPORT_FORMAT).toString(),
          codeType: (result.codeType.result[0]) ? result.codeType.result[0].codeType.id : null,
          venue: (result.venue.result[0]) ? result.venue.result[0].venue.id : null,
          club: (result.club.result[0]) ? result.club.result[0].club.id : null,
          region: (result.region.result[0]) ? result.region.result[0].region.id : null,
          round: result.round.request,
          description: '',
          // Simulcast
          isFta: (result.broadcast.request.toLowerCase() === 'simulcast') || false,
          // STV
          isPpv: (result.broadcast.request.toLowerCase() !== 'simulcast') || false
        }
        await eventRepository.create(request)
      })
    }

    ctx.ok(rowResult)
  } catch (error) {
    throw error
  }
}

const processBulkImportEvent = async (requestBody) => {
  debug(processBulkImportEvent.name)
  const [
    codeTypes,
    clubs,
    venues,
    regions
  ] = await Promise.all([
    // Fetch All code types (event types)
    await codeTypeRepository.all(),
    // Fetch All Clubs
    await clubRepository.all(),
    // Fetch All venues
    await venueRepository.all(),
    // Fetch All regions
    await regionRepository.all()
  ])

  const rowResult = []
  let allowUpload = true
  let totalAutoApplyRecommend = 0

  requestBody.forEach(event => {
    // Validate is row length is matched columns count
    if (event.length === 9) {
      // Define Structure of individual Import event
      const validatedResult = {
        rowError: false,
        rowRecommend: false,
        fixtures: {
          request: event[0],
          result: [{
            source: event[0],
            fixtures: {}
          }]
        },
        startDate: {
          request: event[1],
          result: []
        },
        endDate: {
          request: event[2],
          result: []
        },
        codeType: {
          request: event[3],
          result: []
        },
        club: {
          request: event[4],
          result: []
        },
        venue: {
          request: event[5],
          result: []
        },
        region: {
          request: event[6],
          result: []
        },
        round: {
          request: event[7],
          result: []
        },
        broadcast: {
          request: event[8],
          result: []
        }
      }

      if (event[0] === '') {
        validatedResult.fixtures.result[0] = ({ isError: true, source: 'This field is required' })
        validatedResult.rowError = true
        allowUpload = false
      }

      // Process And Validate Data
      // Check valid Start Date
      if (event[1] !== '') {
        const result = validateDate(event[1], dateFormat.importEventFormat)
        if (!result) {
          validatedResult.startDate.result.push({ isError: true, source: event[1] })
          allowUpload = false
          validatedResult.rowError = true
        } else {
          validatedResult.startDate.result.push({ source: event[1] })
        }
      } else {
        validatedResult.rowError = true
        validatedResult.startDate.result.push({ isError: true, source: 'This field is required' })
        allowUpload = false
      }

      // Check valid End Date
      if (event[2] !== '') {
        const result = validateDate(event[2], dateFormat.importEventFormat)
        if (!result) {
          validatedResult.endDate.result.push({ isError: true, source: event[2] })
          allowUpload = false
          validatedResult.rowError = true
        } else {
          validatedResult.endDate.result.push({ source: event[2] })
        }
      } else {
        validatedResult.rowError = true
        validatedResult.endDate.result.push({ isError: true, source: 'This field is required' })
        allowUpload = false
      }

      // Check valid Code Type and this should require code type
      if (event[3] !== '') {
        event[3].split(';').forEach(importEventType => {
          const matchedResult = processBestMatch(importEventType.toLowerCase(), codeTypes.map(codeType => codeType.name.toLowerCase()))
          const result = processSimilarity('codeType', matchedResult, importEventType, codeTypes)
          validatedResult.codeType.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      } else {
        allowUpload = false
        validatedResult.rowError = true
        validatedResult.codeType.result.push({ isError: true, source: 'This field is required' })
      }

      // Check valid Club
      if (event[4] !== '') {
        event[4].split(';').forEach(importClub => {
          const matchedResult = processBestMatch(importClub.toLowerCase(), clubs.map(club => club.name.toLowerCase()))
          const result = processSimilarity('club', matchedResult, importClub, clubs)
          validatedResult.club.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }

      // Check valid venue
      if (event[5] !== '') {
        event[5].split(';').forEach(importVenue => {
          const matchedResult = processBestMatch(importVenue.toLowerCase(), venues.map(venues => venues.name.toLowerCase()))
          const result = processSimilarity('venue', matchedResult, importVenue, venues)
          validatedResult.venue.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }

      // Check valid regions
      if (event[6] !== '') {
        event[6].split(';').forEach(importRegion => {
          const matchedResult = processBestMatch(importRegion.toLowerCase(), regions.map(region => region.name.toLowerCase()))
          const result = processSimilarity('region', matchedResult, importRegion, regions)
          validatedResult.region.result.push(result)
          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        })
      }

      // Validate Round
      if (event[7] !== '' && !Number.isInteger(parseInt(event[7]))) {
        validatedResult.round.result.push({ isError: true, source: event[7] })
        allowUpload = false
        validatedResult.rowError = true
      } else {
        validatedResult.round.result.push({ source: event[7] })
      }

      // Check valid broadcast 'Simulcast' or 'STV
      if (event[8] !== '') {
        const matchedResult = processBestMatch(event[8].toLowerCase(), ['Simulcast', 'STV'].map(item => item.toLowerCase()))
        const result = processSimilarity('broadcast', matchedResult, event[8], [{ name: 'Simulcast' }, { name: 'STV' }])
        validatedResult.broadcast.result.push(result)
        if (result.isNotfound) {
          allowUpload = false
          validatedResult.rowError = true
        }

        if (result.recommend) {
          validatedResult.rowRecommend = true
          totalAutoApplyRecommend++
        }
      }

      rowResult.push(validatedResult)
    } else if (event.length !== 1) {
      allowUpload = false
    }
  })
  return {
    allowUpload,
    totalAutoApplyRecommend,
    validatedResult: rowResult
  }
}
