const debug = require('debug')('qms-tradingdesk-server:controller:admin:assetTypes')
const error = require('debug')('qms-tradingdesk-server:controller:admin:assetTypes:error')
const { getListParameters } = require('../../helpers/paginate')
const assetTypeRepository = require('../../repositories/assetType')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')
const { cacheName } = require('../../config/cacheName')
const { removeCache } = require('../../helpers/redis')
const prefixErrorMessage = 'AssetTypes'
async function create (ctx, next) {
  debug(create.name)
  try {
    const createdVenue = await assetTypeRepository.create(ctx.request.body)
    removeCache(cacheName.assetType.list)
    ctx.created(removeTimestamps(await assetTypeRepository.findById(createdVenue[0])))
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
    const result = await assetTypeRepository.findById(ctx.params.assetTypeID)
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
    const { assetTypeID } = ctx.params
    const { body: venueRequest } = ctx.request
    await assetTypeRepository.update(assetTypeID, venueRequest)
    removeCache(cacheName.assetType.list)
    ctx.ok(removeTimestamps(await assetTypeRepository.findById(assetTypeID)))
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
    const result = await assetTypeRepository.list(params.page, params.itemsPerPage, params.orderBy)
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
    const { assetTypeID } = ctx.params
    await assetTypeRepository.del(assetTypeID)
    removeCache(cacheName.assetType.list)
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
