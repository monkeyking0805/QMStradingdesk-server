const debug = require('debug')('qms-tradingdesk-server:controller:admin:brandCategories')
const error = require('debug')('qms-tradingdesk-server:controller:admin:brandCategories:error')
const { getListParameters } = require('../../helpers/paginate')
const brandCategoryRepository = require('../../repositories/brandCategory')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')
const { cacheName } = require('../../config/cacheName')
const { removeCache } = require('../../helpers/redis')

const prefixErrorMessage = 'Brand Category'
async function create (ctx, next) {
  debug(create.name)
  try {
    const createdCode = await brandCategoryRepository.create(ctx.request.body)
    removeCache(cacheName.brandCategories.list)
    ctx.created(removeTimestamps(await brandCategoryRepository.findById(createdCode[0])))
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
    const result = await brandCategoryRepository.findById(ctx.params.brandCategoryID)
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
    const { brandCategoryID } = ctx.params
    const { body: codeRequest } = ctx.request
    await brandCategoryRepository.update(brandCategoryID, codeRequest)
    removeCache(cacheName.brandCategories.list)
    ctx.ok(removeTimestamps(await brandCategoryRepository.findById(brandCategoryID)))
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
    let result
    if (ctx.request.query.brand === undefined) {
      result = await brandCategoryRepository.list(params.page, params.itemsPerPage, params.orderBy)
    } else {
      result = await brandCategoryRepository.search(params.page, params.itemsPerPage, ctx.request.query.brand)
    }
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
    const { brandCategoryID } = ctx.params
    await brandCategoryRepository.del(brandCategoryID)
    removeCache(cacheName.brandCategories.list)
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
