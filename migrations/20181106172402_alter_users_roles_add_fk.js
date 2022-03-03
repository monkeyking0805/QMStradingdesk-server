exports.up = (knex, Promise) => {
  return knex.schema.table('users_roles', (table) => {
    table.foreign('user_id').references('id').inTable('users')
    table.foreign('role_id').references('id').inTable('roles')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('users_roles', (table) => {
    table.dropForeign('role_id')
    table.dropForeign('user_id')
  })
}
