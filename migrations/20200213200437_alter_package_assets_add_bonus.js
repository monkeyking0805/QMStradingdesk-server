exports.up = (knex, Promise) => {
  return knex.schema.table('packages_assets', (table) => {
    table.integer('bonus').defaultTo(0)
  })
}

exports.down = (knex, Promise) => {}
