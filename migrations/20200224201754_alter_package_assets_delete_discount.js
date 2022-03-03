exports.up = (knex, Promise) => {
  return knex.schema.table('packages_assets', (table) => {
    table.dropColumn('discount')
  })
}

exports.down = (knex, Promise) => {}
