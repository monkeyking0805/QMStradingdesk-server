'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:brandCategories')
const error = require('debug')('qms-tradingdesk-server:controllers:brandCategories:error')
const brandRepository = require('../../repositories/brand')
const { removeTimestamps } = require('../../helpers/transformer')

module.exports = {
  list
}

async function list (ctx) {
  debug(list.name)

  try {
    const brands = await brandRepository.all()
    ctx.body = removeTimestamps(brands)
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
