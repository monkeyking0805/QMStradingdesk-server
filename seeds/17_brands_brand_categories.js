exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'brands_brand_categories_id_seq\', 1)')

  return knex('brands_brand_categories').insert([])
}
