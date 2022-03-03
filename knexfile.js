// Update with your config settings.

require('dotenv').config()

const config = require('./lib/config/')

module.exports = {
  client: 'postgresql',
  connection: config.env.db,
  pool: config.env.db.pool,
  migrations: {
    tableName: 'knex_migrations'
  }
}
