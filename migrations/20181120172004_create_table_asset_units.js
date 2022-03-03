exports.up = (knex, Promise) => {
  return knex.schema.createTable('asset_units', (table) => {
    table.increments()
    table.string('name', 100).notNullable()
    table.string('duration', 24).notNullable()
    table.float('price_fta', 10, 2).notNullable()
    table.float('price_ppv', 10, 2).notNullable()
    table.float('fee_production', 10, 2).notNullable()
    table.float('fee_installation', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('asset_units')
}
