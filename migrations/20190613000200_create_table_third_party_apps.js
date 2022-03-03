exports.up = (knex, Promise) => {
  return knex.schema.createTable('third_party_apps', (table) => {
    table.increments()
    table.text('name').nullable()
    table.text('api_keys').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('third_party_apps')
}
