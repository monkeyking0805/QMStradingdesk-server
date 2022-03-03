exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'countries_id_seq\', 3)')

  return knex('countries').insert([
    {
      id: 1,
      name: 'Australia'
    },
    {
      id: 2,
      name: 'New Zealand'
    }
  ])
}
