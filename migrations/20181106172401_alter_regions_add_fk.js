exports.up = (knex, Promise) => {
  return knex.schema.table('regions', (table) => {
    table.foreign('country_id').references('id').inTable('countries')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('regions', (table) => {
    table.dropForeign('country_id')
  })
}
