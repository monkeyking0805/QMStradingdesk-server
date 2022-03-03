'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:codes')
const error = require('debug')('qms-tradingdesk-server:controllers:codes:error')
const codeRepository = require('../../repositories/code')
const { removeTimestamps } = require('../../helpers/transformer')
const { setCache, getCache } = require('../../helpers/redis')
const { cacheName } = require('../../config/cacheName')
module.exports = {
  list
}

async function list (ctx) {
  debug(list.name)
  try {
    let codesList
    const getCodeListCache = await getCache(cacheName.codes.list)
    if (getCodeListCache === null) {
      codesList = await codeRepository.all()
      setCache(cacheName.codes.list, JSON.stringify(codesList))
    } else {
      codesList = JSON.parse(getCodeListCache)
    }
    ctx.ok(removeTimestamps(codesList))
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
