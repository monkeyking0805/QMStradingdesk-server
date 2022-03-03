const debug = require('debug')('qms-tradingdesk-server:controller:admin:brands')
const error = require('debug')('qms-tradingdesk-server:controller:admin:brands:error')
const { getListParameters } = require('../../helpers/paginate')
const brandRepository = require('../../repositories/brand')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')

const prefixErrorMessage = 'Brands'
async function create (ctx, next) {
  debug(create.name)
  try {
    ctx.created(removeTimestamps(await brandRepository.create(ctx.request.body)))
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
    const result = await brandRepository.findById(ctx.params.brandID)
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
    const { brandID } = ctx.params
    const { body: brandRequest } = ctx.request
    ctx.ok(removeTimestamps(await brandRepository.update(brandID, brandRequest)))
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
      result = await brandRepository.list(params.page, params.itemsPerPage, params.orderBy)
    } else {
      result = await brandRepository.search(params.page, params.itemsPerPage, ctx.request.query.brand)
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
    const { brandID } = ctx.params
    await brandRepository.del(brandID)
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
