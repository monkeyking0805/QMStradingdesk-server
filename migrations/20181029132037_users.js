exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('firstname').nullable()
    table.string('lastname').nullable()
    table.integer('country_id').nullable()
    table.integer('region_id').nullable()
    table.integer('language_id').notNullable().defaultTo(1)
    table.integer('timezone_id').notNullable().defaultTo(1)
    table.boolean('is_disabled').notNullable().defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
