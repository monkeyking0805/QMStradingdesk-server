'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:codes')
const error = require('debug')('qms-tradingdesk-server:controllers:codes:error')
const codeRepository = require('../../repositories/code')
const { removeTimestamps } = require('../../helpers/transformer')

module.exports = {
  list
}

async function list (ctx) {
  debug(list.name)

  try {
    ctx.ok(removeTimestamps(await codeRepository.all()))
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
