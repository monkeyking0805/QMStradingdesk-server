exports.up = (knex, Promise) => {
  return knex.schema.createTable('asset_unit_links', (table) => {
    table.increments()
    table.integer('asset_unit_id').notNullable()
    table.text('link').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('asset_unit_id').references('id').inTable('asset_units')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('asset_unit_links')
}
