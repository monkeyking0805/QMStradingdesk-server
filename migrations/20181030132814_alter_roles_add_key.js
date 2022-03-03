const roleKeys = require('../lib/config').static.roleKeys

exports.up = (knex, Promise) => {
  return knex.schema.table('roles', (table) => {
    table.string('key').unique()
  })
    .then(() => {
      return knex('roles').update('key', roleKeys.admin).where('id', 1)
    }).then(() => {
      return knex('roles').update('key', roleKeys.sales).where('id', 2)
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('roles', (table) => {
    table.dropColumn('key')
  })
}
