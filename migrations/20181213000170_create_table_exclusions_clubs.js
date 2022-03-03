exports.up = (knex, Promise) => {
  return knex.schema.createTable('exclusions_clubs', (table) => {
    table.increments()
    table.integer('exclusion_id').notNullable()
    table.integer('club_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('exclusion_id').references('id').inTable('exclusions')
    table.foreign('club_id').references('id').inTable('clubs')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('exclusions_clubs')
}
