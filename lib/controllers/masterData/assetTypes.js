'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:assetTypes')
const error = require('debug')('qms-tradingdesk-server:controllers:assetTypes:error')
const assetTypeRepository = require('../../repositories/assetType')
const { removeTimestamps } = require('../../helpers/transformer')
const { setCache, getCache } = require('../../helpers/redis')
const { cacheName } = require('../../config/cacheName')
module.exports = {
  list
}

async function list (ctx) {
  debug(list.name)
  try {
    let assetTypesList
    const getAssetTypeCache = await getCache(cacheName.assetType.list)
    if (getAssetTypeCache === null) {
      assetTypesList = await assetTypeRepository.all()
      setCache(cacheName.assetType.list, JSON.stringify(assetTypesList))
    } else {
      assetTypesList = JSON.parse(getAssetTypeCache)
    }
    ctx.ok(removeTimestamps(assetTypesList))
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
