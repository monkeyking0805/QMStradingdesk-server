exports.seed = async function (knex, Promise) {
  await knex.raw('SELECT setval(\'codes_id_seq\', 9)')

  return knex('codes').insert([
    {
      id: 1,
      name: 'A-League'
    },
    {
      id: 2,
      name: 'AFL'
    },
    {
      id: 3,
      name: 'Cricket'
    },
    {
      id: 4,
      name: 'NBL'
    },
    {
      id: 5,
      name: 'Netball '
    },
    {
      id: 6,
      name: 'NRL'
    },
    {
      id: 7,
      name: 'Super Rugby'
    },
    {
      id: 8,
      name: 'V8 Supercars'
    },
    {
      id: 9,
      name: 'Bespoke Events'
    }
  ])
}
