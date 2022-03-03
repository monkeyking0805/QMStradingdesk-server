exports.up = (knex, Promise) => {
  return knex.schema.createTable('exclusions', (table) => {
    table.increments()
    table.text('note').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('exclusions')
}
