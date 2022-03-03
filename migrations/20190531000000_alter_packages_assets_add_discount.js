exports.up = async (knex, Promise) => {
  await knex.schema.table('packages_assets', (table) => {
    table.decimal('discount').defaultTo(0)
  })
  return knex('packages_assets')
    .whereNull('discount')
    .update({ discount: 0 })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('packages_assets', (table) => {
    table.dropColumns(['discount'])
  })
}
