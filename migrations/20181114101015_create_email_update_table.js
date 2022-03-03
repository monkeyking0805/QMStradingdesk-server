
exports.up = (knex, Promise) => {
  return knex.schema.createTable('email_update', (table) => {
    table.increments()
    table.integer('user_id').references('id').inTable('users')
    table.uuid('uuid')
    table.string('email')
    table.timestamp('expire_at')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('email_update')
}
