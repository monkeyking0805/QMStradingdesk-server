exports.up = (knex, Promise) => {
  return knex.schema.createTable('assets', (table) => {
    table.increments()
    table.integer('asset_type_id').notNullable()
    table.integer('asset_unit_id').notNullable()
    table.integer('event_id').notNullable()
    table.string('name', 100).nullable()
    table.integer('slots').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.foreign('asset_type_id').references('id').inTable('asset_types')
    table.foreign('asset_unit_id').references('id').inTable('asset_units')
    table.foreign('event_id').references('id').inTable('events')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('assets')
}
