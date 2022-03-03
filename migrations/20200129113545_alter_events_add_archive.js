exports.up = (knex, Promise) => {
  return knex.schema.table('events', (table) => {
    table.boolean('archive').notNullable().defaultTo(false)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('events', (table) => {
    table.dropColumn('archive')
  })
}
