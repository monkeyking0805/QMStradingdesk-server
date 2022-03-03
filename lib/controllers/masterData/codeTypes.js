'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:codeTypes')
const error = require('debug')('qms-tradingdesk-server:controllers:codeTypes:error')
const codeTypeRepository = require('../../repositories/codeType')
const { removeTimestamps } = require('../../helpers/transformer')

module.exports = {
  list
}

async function list (ctx) {
  debug(list.name)

  try {
    ctx.ok(removeTimestamps(await codeTypeRepository.all()))
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
