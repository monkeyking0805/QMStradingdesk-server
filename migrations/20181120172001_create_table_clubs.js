exports.up = (knex, Promise) => {
  return knex.schema.createTable('clubs', (table) => {
    table.increments()
    table.string('name', 100).unique().notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('clubs')
}
