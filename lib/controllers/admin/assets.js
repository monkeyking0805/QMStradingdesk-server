const debug = require('debug')('qms-tradingdesk-server:controller:admin:assets')
const error = require('debug')('qms-tradingdesk-server:controller:admin:assets:error')
const { getListParameters } = require('../../helpers/paginate')
const assetRepository = require('../../repositories/asset')
const assetTypeRepository = require('../../repositories/assetType')
const assetUnitRepository = require('../../repositories/assetUnit')
const eventRepository = require('../../repositories/event/index')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')
const listTransformer = require('../../transformers/assets/list')
const { processSimilarity, processBestMatch } = require('../../helpers/similarity')
const prefixErrorMessage = 'Asset'

module.exports = {
  create,
  view,
  update,
  list,
  del,
  restore,
  archive,
  validateImport
}

async function create (ctx, next) {
  debug(create.name)
  try {
    const created = await assetRepository.create(ctx.request.body)
    const result = await assetRepository.findById(created.id)
    ctx.created(listTransformer.transformSingle(result))
  } catch (err) {
    error(create.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function view (ctx, next) {
  debug(view.name)
  try {
    ctx.ok(listTransformer.transformSingle(ctx.state.asset))
  } catch (err) {
    error(view.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function update (ctx, next) {
  debug(update.name)
  try {
    const { id } = ctx.params
    await assetRepository.update(id, ctx.request.body)
    const result = await assetRepository.findById(ctx.params.id)
    ctx.ok(removeTimestamps(result))
  } catch (err) {
    error(update.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function list (ctx, next) {
  debug(list.name)
  try {
    const params = getListParameters(ctx)
    const result = await assetRepository.list(params.page, params.itemsPerPage, params.orderBy, ctx.request.body)
    result.rows = listTransformer.transform(result.rows)
    let parameters = Object.assign({}, ctx.request.query)
    parameters = Object.assign(parameters, ctx.request.body)
    ctx.ok({
      ...result,
      parameters
    })
  } catch (err) {
    error(list.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function del (ctx, next) {
  debug(del.name)
  try {
    await assetRepository.del(ctx.params.id)
    ctx.ok()
  } catch (err) {
    error(del.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function archive (ctx, next) {
  debug(update.name)
  try {
    const result = await assetRepository.archive(ctx.request.body.id)
    ctx.ok(removeTimestamps(result))
  } catch (err) {
    error(update.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function restore (ctx, next) {
  debug(update.name)
  try {
    const result = await assetRepository.restore(ctx.request.body.id)
    ctx.ok(removeTimestamps(result))
  } catch (err) {
    error(update.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function validateImport (ctx, next) {
  debug(validateImport.name)
  try {
    const processedResult = await _processBulkImportAsset(ctx.request.body)
    /*
    { name: '123',
      slots: 456,
      assetUnit: 35,
      assetType: 2,
      event: 338
    }
    */

    if (processedResult.allowUpload) {
      processedResult.validatedResult.forEach(async result => {
        const request = {
          slots: (result.slots.result[0]) ? result.slots.request : null,
          assetUnit: (result.assetUnit.result[0]) ? result.assetUnit.result[0].assetUnit.id : null,
          assetType: (result.assetType.result[0]) ? result.assetType.result[0].assetType.id : null,
          event: (result.event.result[0]) ? result.event.result[0].event.id : null
        }
        assetRepository.create(request)
      })
    }
    ctx.ok(processedResult)
  } catch (error) {
    throw error
  }
}

const _processBulkImportAsset = async (requestBody) => {
  debug(_processBulkImportAsset.name)
  const [
    events,
    assetTypes,
    assetUnits
  ] = await Promise.all([
    await eventRepository.all(),
    await assetTypeRepository.all(),
    await assetUnitRepository.all()
  ])

  const rowResult = []
  let allowUpload = true
  let totalAutoApplyRecommend = 0

  requestBody.forEach(asset => {
    if (asset.length === 6) {
      const validatedResult = {
        rowError: false,
        rowRecommend: false,
        event: {
          request: '',
          result: []
        },
        assetType: {
          request: asset[2],
          result: []
        },
        assetUnit: {
          request: '',
          result: []
        },
        slots: {
          request: asset[5],
          result: [{
            source: asset[5],
            slots: {}
          }]
        }
      }
      // Check if column eventID or column event name is set
      if (asset[0] !== '' || asset[1] !== '') {
        if (asset[0] !== '') {
          const resultEvent = events.filter((event) => parseInt(asset[0]) === event.id)
          if (resultEvent.length !== 0) {
            validatedResult.event.request = `Event ID: ${asset[0]}`
            validatedResult.event.result.push({
              source: asset[0],
              event: resultEvent[0]
            })
          } else {
            allowUpload = false
            validatedResult.rowError = true
            validatedResult.event.result.push({ isError: true, source: `Event ID: ${asset[0]} is not found` })
          }
        } else {
          validatedResult.event.request = asset[1]
          const matchedResult = processBestMatch(asset[1].toLowerCase(), events.map(event => event.name.toLowerCase()))
          const result = processSimilarity('event', matchedResult, asset[1], events)
          validatedResult.event.result.push(result)

          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        }
      } else {
        validatedResult.rowError = true
        validatedResult.event.result.push({ isError: true, source: 'This field is required' })
        allowUpload = false
      }

      // Check if asset type is set
      if (asset[2] !== '') {
        const matchedResult = processBestMatch(asset[2].toLowerCase(), assetTypes.map(assetType => assetType.name.toLowerCase()))
        const result = processSimilarity('assetType', matchedResult, asset[2], assetTypes)
        validatedResult.assetType.result.push(result)
        if (result.isNotfound) {
          allowUpload = false
          validatedResult.rowError = true
        }

        if (result.recommend) {
          validatedResult.rowRecommend = true
          totalAutoApplyRecommend++
        }
      } else {
        validatedResult.rowError = true
        validatedResult.assetType.result.push({ isError: true, source: 'This field is required' })
        allowUpload = false
      }

      // Check if column asset unit id or column asset unit name is set
      if (asset[3] !== '' || asset[4] !== '') {
        if (asset[3] !== '') {
          const resultAssetUnit = assetUnits.filter((assetUnit) => parseInt(asset[3]) === assetUnit.id)
          if (resultAssetUnit.length !== 0) {
            validatedResult.assetUnit.request = `Asset unit ID: ${asset[3]}`
            validatedResult.assetUnit.result.push({
              source: asset[3],
              assetUnit: resultAssetUnit[0]
            })
          } else {
            allowUpload = false
            validatedResult.rowError = true
            validatedResult.assetUnit.result.push({ isError: true, source: `Asset unit ID: ${asset[3]} is not found` })
          }
        } else {
          validatedResult.assetUnit.request = asset[4]
          const matchedResult = processBestMatch(asset[4].toLowerCase(), assetUnits.map(assetUnit => assetUnit.name.toLowerCase()))
          const result = processSimilarity('assetUnit', matchedResult, asset[4], assetUnits)
          validatedResult.assetUnit.result.push(result)

          if (result.isNotfound) {
            allowUpload = false
            validatedResult.rowError = true
          }

          if (result.recommend) {
            validatedResult.rowRecommend = true
            totalAutoApplyRecommend++
          }
        }
      } else {
        validatedResult.rowError = true
        validatedResult.assetUnit.result.push({ isError: true, source: 'This field is required' })
        allowUpload = false
      }
      rowResult.push(validatedResult)

      // Check slot is empty or not
      if (validatedResult.slots.request === '') {
        validatedResult.slots.result[0] = ({ isError: true, source: 'This field is required' })
        validatedResult.rowError = true
        allowUpload = false
      }

      // Check slot is numeric or not
      if (isNaN(parseInt(validatedResult.slots.request))) {
        validatedResult.slots.result[0] = ({ isError: true, source: validatedResult.slots.request })
        validatedResult.rowError = true
        allowUpload = false
      }
    } else if (asset.length !== 1) {
      allowUpload = false
    }
  })
  return {
    allowUpload,
    totalAutoApplyRecommend,
    validatedResult: rowResult
  }
}
