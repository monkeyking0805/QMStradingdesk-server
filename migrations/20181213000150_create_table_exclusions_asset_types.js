exports.up = (knex, Promise) => {
  return knex.schema.createTable('exclusions_asset_types', (table) => {
    table.increments()
    table.integer('exclusion_id').notNullable()
    table.integer('asset_type_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('exclusion_id').references('id').inTable('exclusions')
    table.foreign('asset_type_id').references('id').inTable('asset_types')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('exclusions_asset_types')
}
