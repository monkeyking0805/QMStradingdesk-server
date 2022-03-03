exports.seed = async function (knex, Promise) {
  await knex.raw('SELECT setval(\'exclusions_code_types_id_seq\', 1)')

  return knex('exclusions_code_types').insert([])
}
