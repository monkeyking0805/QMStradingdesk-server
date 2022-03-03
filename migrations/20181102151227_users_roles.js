exports.up = (knex, Promise) => {
  return knex.schema.createTable('users_roles', (table) => {
    table.increments()
    table.integer('user_id').unique().notNullable()
    table.integer('role_id').notNullable()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users_roles')
}
