const debug = require('debug')('qms-tradingdesk-server:controller:admin:codes')
const error = require('debug')('qms-tradingdesk-server:controller:admin:codes:error')
const { getListParameters } = require('../../helpers/paginate')
const codeRepository = require('../../repositories/code')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')
const { cacheName } = require('../../config/cacheName')
const { removeCache } = require('../../helpers/redis')

const prefixErrorMessage = 'Codes'
async function create (ctx, next) {
  debug(create.name)
  try {
    const createdCode = await codeRepository.create(ctx.request.body)
    removeCache(cacheName.codes.list)
    ctx.created(removeTimestamps(await codeRepository.findById(createdCode[0])))
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
    const result = await codeRepository.findById(ctx.params.codeID)
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
    const { codeID } = ctx.params
    const { body: codeRequest } = ctx.request
    await codeRepository.update(codeID, codeRequest)
    removeCache(cacheName.codes.list)
    ctx.ok(removeTimestamps(await codeRepository.findById(codeID)))
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
    const result = await codeRepository.list(params.page, params.itemsPerPage, params.orderBy)
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
    const { codeID } = ctx.params
    await codeRepository.del(codeID)
    removeCache(cacheName.codes.list)
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
