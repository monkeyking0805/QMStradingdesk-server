exports.up = (knex, Promise) => {
  return knex.schema.createTable('packages_brand_categories', (table) => {
    table.increments()
    table.integer('package_id').notNullable()
    table.integer('brand_category_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('package_id').references('id').inTable('packages')
    table.foreign('brand_category_id').references('id').inTable('brand_categories')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('packages_brand_categories')
}
