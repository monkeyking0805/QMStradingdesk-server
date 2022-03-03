exports.up = (knex, Promise) => {
  return knex.schema.createTable('package_statuses', (table) => {
    table.increments()
    table.string('name', 20).unique().notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('package_statuses')
}
