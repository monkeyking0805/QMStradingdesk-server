const { cache } = require('../config/environment')
const client = require('redis').createClient(cache.port, cache.host)
const { promisify } = require('util')
const debug = require('debug')('qms-tradingdesk-server:helpers:cache')
const error = require('debug')('qms-tradingdesk-server:helpers:cache:error')
const getAsync = promisify(client.get).bind(client)
client.on('error', () => {
  error('redis:error')
  client.quit()
})
const setCache = (key, values) => {
  debug(setCache.name)
  try {
    client.set(key, values, 'EX', 600)
  } catch (err) {
    error(setCache.name, err)
  }
}

const getCache = async (key) => {
  debug(getCache.name)
  try {
    const result = await getAsync(key)
    return result
  } catch (error) {
    return null
  }
}

const removeCache = (key) => {
  debug(removeCache.name)
  try {
    client.del(key)
  } catch (err) {
    error(removeCache.name, err)
  }
}

module.exports = {
  setCache,
  getCache,
  removeCache
}
