'use strict'

const debug = require('debug')('qms-tradingdesk-server:controller:admin:assetUnits')
const error = require('debug')('qms-tradingdesk-server:controller:admin:assetUnits:error')
const paginateHelper = require('../../helpers/paginate')
const { removeTimestamps } = require('../../helpers/transformer')
const assetRepository = require('../../repositories/asset')
const assetUnitRepository = require('../../repositories/assetUnit')
const { databaseErrorHandling } = require('../../helpers/databaseErrorHandling')
const {
  static: { assetUnitsOrderByColumns }
} = require('../../config')

module.exports = {
  create,
  view,
  update,
  list,
  del,
  archive,
  restore
}

async function create (ctx, next) {
  debug(create.name)
  try {
    const created = await assetUnitRepository.create(ctx.request.body)
    ctx.created(await assetUnitRepository.findById(created.id))
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
    ctx.ok(ctx.state.assetUnit)
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
    await assetUnitRepository.update(id, ctx.request.body)
    ctx.ok(await assetUnitRepository.findById(id))
  } catch (err) {
    error(update.name, err)
    err.expose = true
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

function getListParameters (ctx) {
  const { page, itemsPerPage } = paginateHelper.getUrlParameters(ctx)
  const { order_by: orderBy, name, archive } = ctx.request.query
  return {
    name,
    page,
    archive,
    itemsPerPage,
    orderBy
  }
}

async function list (ctx, next) {
  debug(list.name)
  try {
    const params = getListParameters(ctx)
    const orderByColumn = assetUnitsOrderByColumns[params.orderBy]
    const result = await assetUnitRepository.list(params.page, params.itemsPerPage, orderByColumn, { name: params.name, archive: params.archive })
    ctx.ok({
      ...result,
      parameters: ctx.request.query
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
    await assetUnitRepository.del(id)
    ctx.ok()
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
    const archiveUnitResult = await assetUnitRepository.archive(id)
    const assetsForArchivedUnit = await assetRepository.findByAssetUnitId(id)
    if (assetsForArchivedUnit && assetsForArchivedUnit.length !== 0) {
      const archiveRelatedAssets = assetsForArchivedUnit.map(async asset => {
        await assetRepository.archive(asset.id)
      })
      await Promise.all(archiveRelatedAssets)
    }
    ctx.ok(removeTimestamps(archiveUnitResult))
  } catch (err) {
    error(update.name, err)
    databaseErrorHandling(err, 'asset units')
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function restore (ctx, next) {
  debug(update.name)
  try {
    const result = await assetUnitRepository.restore(ctx.request.body.id)
    ctx.ok(removeTimestamps(result))
  } catch (err) {
    error(update.name, err)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}
