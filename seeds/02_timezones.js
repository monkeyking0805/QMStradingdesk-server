exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'timezones_id_seq\', 1)')

  return knex('timezones').insert([
    { id: 1, name: 'GMT+1100', zone: 'Australia/Sydney' }
  ])
}
