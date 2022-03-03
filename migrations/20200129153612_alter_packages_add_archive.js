exports.up = (knex, Promise) => {
  return knex.schema.table('packages', (table) => {
    table.boolean('archive').notNullable().defaultTo(false)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('packages', (table) => {
    table.dropColumn('archive')
  })
}
