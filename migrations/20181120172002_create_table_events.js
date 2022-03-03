exports.up = (knex, Promise) => {
  return knex.schema.createTable('events', (table) => {
    table.increments()
    table.integer('code_type_id').notNullable()
    table.integer('venue_id').nullable()
    table.integer('host_club_id').nullable()
    table.integer('region_id').nullable()
    table.string('name', 100).notNullable()
    table.timestamp('start_date').notNullable()
    table.timestamp('end_date').notNullable()
    table.text('description').nullable()
    table.integer('round').nullable()
    table.boolean('is_fta').nullable().default(false)
    table.boolean('is_ppv').nullable().default(false)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('code_type_id').references('id').inTable('code_types')
    table.foreign('venue_id').references('id').inTable('venues')
    table.foreign('host_club_id').references('id').inTable('clubs')
    table.foreign('region_id').references('id').inTable('regions')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('events')
}
