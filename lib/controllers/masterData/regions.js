'use strict'
const debug = require('debug')('qms-tradingdesk-server:controllers:regions')
const error = require('debug')('qms-tradingdesk-server:controllers:regions:error')
const knex = require('../../db')
const { removeTimestamps } = require('../../helpers/transformer')
const { setCache, getCache } = require('../../helpers/redis')
const { cacheName } = require('../../config/cacheName')

module.exports = {
  list
}

async function list (ctx, next) {
  debug(list.name)
  try {
    let regionsList
    const getRegionListCache = await getCache(cacheName.regions.list)
    if (getRegionListCache === null) {
      regionsList = await knex('regions').orderBy('name')
      setCache(cacheName.regions.list, JSON.stringify(regionsList))
    } else {
      regionsList = JSON.parse(getRegionListCache)
    }
    ctx.ok(removeTimestamps(regionsList))
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
