exports.up = async (knex, Promise) => {
  await knex.schema.table('users', (table) => {
    table.string('phone').nullable()
    table.boolean('is_deleted').notNullable().defaultTo(false)
  })
  return knex('users')
    .whereNull('is_deleted')
    .update({ is_deleted: false })
}

exports.down = (knex, Promise) => {
  return knex.schema.table('users', (table) => {
    table.dropColumns(['phone', 'is_deleted'])
  })
}
