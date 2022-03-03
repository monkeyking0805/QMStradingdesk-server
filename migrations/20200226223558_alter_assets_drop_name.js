exports.up = (knex, Promise) => {
  return knex.schema.table('assets', (table) => {
    table.dropColumn('name')
  })
}

exports.down = (knex, Promise) => {}
