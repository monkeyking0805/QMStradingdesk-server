'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:assetTypes')
const error = require('debug')('qms-tradingdesk-server:controllers:assetTypes:error')
const assetUnitRepository = require('../../repositories/assetUnit')

module.exports = {
  list,
  view
}

async function list (ctx) {
  debug(list.name)

  try {
    ctx.ok(await assetUnitRepository.simpleList())
  } catch (err) {
    error(list.name, err)
    err.expose = true
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
