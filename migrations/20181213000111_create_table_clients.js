exports.up = (knex, Promise) => {
  return knex.schema.createTable('clients', (table) => {
    table.increments()
    table.string('company_name', 64).notNullable()
    table.string('firstname', 64).notNullable()
    table.string('lastname', 64).nullable().default('')
    table.string('agency_name', 64).nullable().default('')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('clients')
}
