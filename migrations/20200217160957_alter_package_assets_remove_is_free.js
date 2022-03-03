exports.up = (knex, Promise) => {
  return knex.schema.table('packages_assets', (table) => {
    table.dropColumn('is_free')
  })
}

exports.down = (knex, Promise) => {}
