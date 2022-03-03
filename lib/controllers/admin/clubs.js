const debug = require('debug')('qms-tradingdesk-server:controller:admin:clubs')
const error = require('debug')('qms-tradingdesk-server:controller:admin:clubs:error')
const { getListParameters } = require('../../helpers/paginate')
const clubRepository = require('../../repositories/club')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')
const { cacheName } = require('../../config/cacheName')
const { removeCache } = require('../../helpers/redis')
const prefixErrorMessage = 'Clubs'
async function create (ctx, next) {
  debug(create.name)
  try {
    const createdClub = await clubRepository.create(ctx.request.body)
    removeCache(cacheName.clubs.list)
    ctx.created(removeTimestamps(await clubRepository.findById(createdClub[0])))
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
    const result = await clubRepository.findById(ctx.params.clubID)
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
    const { clubID } = ctx.params
    const { body: clubRequest } = ctx.request
    await clubRepository.update(clubID, clubRequest)
    removeCache(cacheName.clubs.list)
    ctx.ok(removeTimestamps(await clubRepository.findById(clubID)))
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
    const result = await clubRepository.list(params.page, params.itemsPerPage, params.orderBy)
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
    const { clubID } = ctx.params
    await clubRepository.del(clubID)
    removeCache(cacheName.clubs.list)
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
