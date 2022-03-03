'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:venues')
const error = require('debug')('qms-tradingdesk-server:controllers:venues:error')
const venueRepository = require('../../repositories/venue')
const { removeTimestamps } = require('../../helpers/transformer')
const { setCache, getCache } = require('../../helpers/redis')
const { cacheName } = require('../../config/cacheName')
module.exports = {
  list
}

async function list (ctx) {
  debug(list.name)
  try {
    let venuesList
    const getVenuesListCache = await getCache(cacheName.venues.list)
    if (getVenuesListCache === null) {
      venuesList = await venueRepository.all()
      setCache(cacheName.venues.list, JSON.stringify(venuesList))
    } else {
      venuesList = JSON.parse(getVenuesListCache)
    }
    ctx.ok(removeTimestamps(venuesList))
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
