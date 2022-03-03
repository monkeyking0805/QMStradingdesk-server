exports.up = (knex, Promise) => {
  return knex.schema.table('users_roles', (table) => {
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('users_roles', (table) => {
    table.dropColumns(['created_at', 'updated_at'])
  })
}
