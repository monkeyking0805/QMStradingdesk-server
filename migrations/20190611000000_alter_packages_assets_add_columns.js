exports.up = async (knex, Promise) => {
  return knex.schema.table('packages_assets', (table) => {
    table.decimal('market_rate').defaultTo(0)
    table.decimal('production_cost').defaultTo(0)
    table.decimal('installation_cost').defaultTo(0)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('packages_assets', (table) => {
    table.dropColumns(['market_rate'])
    table.dropColumns(['production_cost'])
    table.dropColumns(['installation_cost'])
  })
}
