'use strict'

require('dotenv').config()

;(async () => {
  const debug = require('debug')('qms-tradingdesk-server:index')
  const error = require('debug')('qms-tradingdesk-server:index:error')
  const config = require('./lib/config')
  const app = require('./lib/app')
  const knex = require('./lib/db')

  try {
    debug('migrating...')
    await knex.migrate.latest()
    debug('migrated')

    app.start()
    debug(`${config.static.app.start} on port ${config.env.port}`)
  } catch (e) {
    error(`${config.error.sql.unknown}: ${e.message}`)
  }
})()
