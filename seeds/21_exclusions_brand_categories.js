exports.seed = async function (knex, Promise) {
  await knex.raw('SELECT setval(\'exclusions_brand_categories_id_seq\', 1)')

  return knex('exclusions_brand_categories').insert([])
}
