exports.up = (knex, Promise) => {
  return knex.schema.table('asset_units', (table) => {
    table.boolean('archive').notNullable().defaultTo(false)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('asset_units', (table) => {
    table.dropColumn('archive')
  })
}
