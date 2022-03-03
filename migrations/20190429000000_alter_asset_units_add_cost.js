exports.up = async (knex, Promise) => {
  await knex.schema.table('asset_units', (table) => {
    table.decimal('cost')
  })
  return knex('asset_units')
    .whereNull('cost')
    .update({ cost: 0 })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('asset_units', (table) => {
    table.dropColumns(['cost'])
  })
}
