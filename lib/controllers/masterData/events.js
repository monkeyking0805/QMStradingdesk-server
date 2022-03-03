'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:codes')
const error = require('debug')('qms-tradingdesk-server:controllers:codes:error')
const eventRepository = require('../../repositories/event')

module.exports = {
  list
}

async function list (ctx) {
  debug(list.name)
  try {
    ctx.ok(await eventRepository.all())
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
