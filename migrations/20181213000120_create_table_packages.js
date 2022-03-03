exports.up = (knex, Promise) => {
  return knex.schema.createTable('packages', (table) => {
    table.increments()
    table.integer('package_status_id').notNullable()
    table.integer('user_id').notNullable()
    table.integer('client_id').notNullable()
    table.text('name', 64).notNullable()
    table.text('reference_id').notNullable().unique()
    table.text('notes').nullable().default('')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('package_status_id').references('id').inTable('package_statuses')
    table.foreign('user_id').references('id').inTable('users')
    table.foreign('client_id').references('id').inTable('clients')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('packages')
}
