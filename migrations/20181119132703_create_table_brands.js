exports.up = (knex, Promise) => {
  return knex.schema.createTable('brands', (table) => {
    table.increments()
    table.string('name', 100).unique().notNullable()
    table.string('email', 200)
    table.text('description')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('brands')
}
