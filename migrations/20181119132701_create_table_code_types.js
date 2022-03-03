// Code is Sport code eg. NRL, AFL

exports.up = (knex, Promise) => {
  return knex.schema.createTable('code_types', (table) => {
    table.increments()
    table.string('name', 100).notNullable()
    table.integer('code_id').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('code_id').references('id').inTable('codes')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('code_types')
}
