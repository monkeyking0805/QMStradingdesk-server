exports.up = async (knex, Promise) => {
  await knex.schema.table('assets', (table) => {
    table.boolean('is_deleted').notNullable().defaultTo(false)
  })
  return knex('assets')
    .whereNull('is_deleted')
    .update({ is_deleted: false })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('assets', (table) => {
    table.dropColumns(['is_deleted'])
  })
}
