const debug = require('debug')('qms-tradingdesk-server:controller:admin:thirdPartyApps')
const error = require('debug')('qms-tradingdesk-server:controller:admin:thirdPartyApps:error')
const { getListParameters } = require('../../helpers/paginate')
const thirdPartyAppRepository = require('../../repositories/thirdPartyApp')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')
const prefixErrorMessage = 'ThirdPartyApps'
async function create (ctx, next) {
  debug(create.name)
  try {
    const createdThirdPartyApp = await thirdPartyAppRepository.create(ctx.request.body)
    ctx.created(removeTimestamps(await thirdPartyAppRepository.findById(createdThirdPartyApp[0])))
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
    const result = await thirdPartyAppRepository.findById(ctx.params.thirdPartyAppID)
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
    const { thirdPartyAppID } = ctx.params
    const { body: thirdPartyAppRequest } = ctx.request
    await thirdPartyAppRepository.update(thirdPartyAppID, thirdPartyAppRequest)
    ctx.ok(removeTimestamps(await thirdPartyAppRepository.findById(thirdPartyAppID)))
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
    const result = await thirdPartyAppRepository.list(params.page, params.itemsPerPage, params.orderBy)
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
    const { thirdPartyAppID } = ctx.params
    await thirdPartyAppRepository.del(thirdPartyAppID)
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
