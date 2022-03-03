exports.up = (knex, Promise) => {
  return knex.schema.createTable('exclusions_venues', (table) => {
    table.increments()
    table.integer('exclusion_id').notNullable()
    table.integer('venue_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('exclusion_id').references('id').inTable('exclusions')
    table.foreign('venue_id').references('id').inTable('venues')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('exclusions_venues')
}
