exports.up = async (knex, Promise) => {
  await knex.schema.table('asset_units', (table) => {
    table.boolean('is_deleted').notNullable().defaultTo(false)
  })
  return knex('asset_units')
    .whereNull('is_deleted')
    .update({ is_deleted: false })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('asset_units', (table) => {
    table.dropColumns(['is_deleted'])
  })
}
