exports.up = (knex, Promise) => {
  return knex.schema.createTable('packages_assets', (table) => {
    table.increments()
    table.integer('package_id').notNullable()
    table.integer('asset_id').notNullable()
    table.integer('slots').notNullable()
    table.boolean('is_free').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('package_id').references('id').inTable('packages')
    table.foreign('asset_id').references('id').inTable('assets')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('packages_assets')
}
