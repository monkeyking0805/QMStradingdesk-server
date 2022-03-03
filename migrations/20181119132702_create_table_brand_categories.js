exports.up = (knex, Promise) => {
  return knex.schema.createTable('brand_categories', (table) => {
    table.increments()
    table.string('name', 100).unique().notNullable()
    table.integer('parent_brand_category_id').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('brand_categories')
}
