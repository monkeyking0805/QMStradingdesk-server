exports.up = (knex, Promise) => {
  return knex.schema.createTable('brands_brand_categories', (table) => {
    table.increments()
    table.integer('brand_id').notNullable()
    table.integer('brand_category_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('brand_id').references('id').inTable('brands')
    table.foreign('brand_category_id').references('id').inTable('brand_categories')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('brands_brand_categories')
}
