const debug = require('debug')('qms-tradingdesk-server:controller:admin:codeTypes')
const error = require('debug')('qms-tradingdesk-server:controller:admin:codeTypes:error')
const { getListParameters } = require('../../helpers/paginate')
const codeTypeRepository = require('../../repositories/codeType')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const { removeTimestamps } = require('../../helpers/transformer')

const prefixErrorMessage = 'Code types'
async function create (ctx, next) {
  debug(create.name)
  try {
    const createdCodeType = await codeTypeRepository.create(ctx.request.body)
    ctx.created(removeTimestamps(await codeTypeRepository.findById(createdCodeType[0])))
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
    const result = await codeTypeRepository.findById(ctx.params.codeTypeID)
    if (result) {
      ctx.ok(removeTimestamps(result))
    } else {
      ctx.notFound()
    }
  } catch (err) {
    error(view.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    throw err
  }
}

async function update (ctx, next) {
  debug(update.name)
  try {
    const { codeTypeID } = ctx.params
    const { body: codeTypeRequest } = ctx.request
    await codeTypeRepository.update(codeTypeID, codeTypeRequest)
    ctx.ok(removeTimestamps(await codeTypeRepository.findById(codeTypeID)))
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
    const result = await codeTypeRepository.list(params.page, params.itemsPerPage, params.orderBy)
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
    const { codeTypeID } = ctx.params
    await codeTypeRepository.del(codeTypeID)
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
