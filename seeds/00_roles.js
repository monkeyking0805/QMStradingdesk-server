exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'roles_id_seq\', 2)')

  return knex('roles').insert([
    { id: 1, name: 'Administrator', key: 'admin' },
    { id: 2, name: 'Sales representative', key: 'sales' }
  ])
}
