const debug = require('debug')('qms-tradingdesk-server:controller:admin:venues')
const error = require('debug')('qms-tradingdesk-server:controller:admin:venues:error')
const { getListParameters } = require('../../helpers/paginate')
const venueRepository = require('../../repositories/venue')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')
const { cacheName } = require('../../config/cacheName')
const { removeCache } = require('../../helpers/redis')
const prefixErrorMessage = 'Venues'
async function create (ctx, next) {
  debug(create.name)
  try {
    const createdVenue = await venueRepository.create(ctx.request.body)
    removeCache(cacheName.venues.list)
    ctx.created(removeTimestamps(await venueRepository.findById(createdVenue[0])))
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
    const result = await venueRepository.findById(ctx.params.venueID)
    if (result) {
      ctx.ok(removeTimestamps(result))
    } else {
      ctx.notFound()
    }
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
    const { venueID } = ctx.params
    const { body: venueRequest } = ctx.request
    await venueRepository.update(venueID, venueRequest)
    removeCache(cacheName.venues.list)
    ctx.ok(removeTimestamps(await venueRepository.findById(venueID)))
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
    const result = await venueRepository.list(params.page, params.itemsPerPage, params.orderBy)
    ctx.ok({
      ...result,
      parameters: ctx.request.query
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
    const { venueID } = ctx.params
    await venueRepository.del(venueID)
    removeCache(cacheName.venues.list)
    ctx.ok()
  } catch (err) {
    error(del.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

module.exports = {
  create,
  view,
  update,
  list,
  del
}
