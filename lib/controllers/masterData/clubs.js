'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:clubs')
const error = require('debug')('qms-tradingdesk-server:controllers:clubs:error')
const clubRepository = require('../../repositories/club')
const { removeTimestamps } = require('../../helpers/transformer')
const { setCache, getCache } = require('../../helpers/redis')
const { cacheName } = require('../../config/cacheName')
module.exports = {
  list,
  exclusions
}

async function list (ctx) {
  debug(list.name)
  try {
    let clubsList
    const getClubListCache = await getCache(cacheName.clubs.list)
    if (getClubListCache === null) {
      clubsList = await clubRepository.all()
      setCache(cacheName.clubs.list, JSON.stringify(clubsList))
    } else {
      clubsList = JSON.parse(getClubListCache)
    }
    ctx.ok(removeTimestamps(clubsList))
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}

async function exclusions (ctx) {
  debug(exclusions.name)
  try {
    const { id } = ctx.params
    const exclusions = await clubRepository.getExclusions(id)
    ctx.ok(exclusions)
  } catch (err) {
    error(exclusions.name, err)
    err.expose = true
    throw err
  }
}
