exports.seed = async function (knex, Promise) {
  await knex.raw('SELECT setval(\'exclusions_brands_id_seq\', 1)')

  return knex('exclusions_brands').insert([])
}
