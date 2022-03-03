exports.seed = async function (knex, Promise) {
  await knex.raw('SELECT setval(\'exclusions_asset_types_id_seq\', 1)')

  return knex('exclusions_asset_types').insert([])
}
