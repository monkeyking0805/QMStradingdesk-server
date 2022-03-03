exports.up = (knex, Promise) => {
  return knex.schema.createTable('codes_clubs', (table) => {
    table.increments()
    table.integer('code_id').notNullable()
    table.integer('club_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('code_id').references('id').inTable('codes')
    table.foreign('club_id').references('id').inTable('clubs')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('codes_clubs')
}
