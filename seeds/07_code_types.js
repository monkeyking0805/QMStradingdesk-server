exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'code_types_id_seq\', 12)')

  return knex('code_types').insert([
    {
      id: 1,
      code_id: 1,
      name: 'A-League'
    },
    {
      id: 2,
      code_id: 2,
      name: 'AFL'
    },
    {
      id: 3,
      code_id: 3,
      name: 'Cricket'
    },
    {
      id: 4,
      code_id: 4,
      name: 'NBL'
    },
    {
      id: 5,
      code_id: 5,
      name: 'Suncorp Super Netball'
    },
    {
      id: 6,
      code_id: 5,
      name: 'Netball International Series'
    },
    {
      id: 7,
      code_id: 7,
      name: 'Super Rugby'
    },
    {
      id: 8,
      code_id: 6,
      name: 'Grand Final'
    },
    {
      id: 9,
      code_id: 6,
      name: 'State of Origin'
    },
    {
      id: 10,
      code_id: 6,
      name: 'NRL Premiership'
    },
    {
      id: 11,
      code_id: 8,
      name: 'V8 Supercars'
    },
    {
      id: 12,
      code_id: 9,
      name: 'Bespoke events'
    }
  ])
}
