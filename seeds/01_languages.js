exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'languages_id_seq\', 1)')

  return knex('languages').insert([
    { id: 1, name: 'English' }
  ])
}
