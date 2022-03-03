exports.up = (knex, Promise) => {
  return knex.schema.createTable('regions', (table) => {
    table.increments()
    table.integer('country_id').notNullable()
    table.string('name').unique().notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('regions')
}
