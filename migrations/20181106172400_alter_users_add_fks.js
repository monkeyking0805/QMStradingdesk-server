exports.up = (knex, Promise) => {
  return knex.schema.table('users', (table) => {
    table.foreign('country_id').references('id').inTable('countries')
    table.foreign('region_id').references('id').inTable('regions')
    table.foreign('language_id').references('id').inTable('languages')
    table.foreign('timezone_id').references('id').inTable('timezones')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('users', (table) => {
    table.dropForeign('timezone_id')
    table.dropForeign('language_id')
    table.dropForeign('region_id')
    table.dropForeign('country_id')
  })
}
