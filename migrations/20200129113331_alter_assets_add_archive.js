exports.up = (knex, Promise) => {
  return knex.schema.table('assets', (table) => {
    table.boolean('archive').notNullable().defaultTo(false)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('assets', (table) => {
    table.dropColumn('archive')
  })
}
