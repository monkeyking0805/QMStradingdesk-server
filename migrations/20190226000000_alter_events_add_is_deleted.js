exports.up = async (knex, Promise) => {
  await knex.schema.table('events', (table) => {
    table.boolean('is_deleted').notNullable().defaultTo(false)
  })
  return knex('events')
    .whereNull('is_deleted')
    .update({ is_deleted: false })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('events', (table) => {
    table.dropColumns(['is_deleted'])
  })
}
