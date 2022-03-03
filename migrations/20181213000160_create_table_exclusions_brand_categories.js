exports.up = (knex, Promise) => {
  return knex.schema.createTable('exclusions_brand_categories', (table) => {
    table.increments()
    table.integer('exclusion_id').notNullable()
    table.integer('brand_category_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('exclusion_id').references('id').inTable('exclusions')
    table.foreign('brand_category_id').references('id').inTable('brand_categories')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('exclusions_brand_categories')
}
