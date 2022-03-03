exports.up = (knex, Promise) => {
  return knex.schema.table('asset_units', (table) => {
    table.integer('price_min').defaultTo(0)
  })
}

exports.down = (knex, Promise) => {}
