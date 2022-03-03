exports.up = (knex, Promise) => {
  return knex.schema.createTable('password_reset', (table) => {
    table.increments()
    table.integer('user_id').notNullable()
    table.uuid('uuid').unique().notNullable()
    table.timestamp('expire_at').defaultTo(knex.fn.now())
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.foreign('user_id').references('id').inTable('users')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('password_reset')
}
