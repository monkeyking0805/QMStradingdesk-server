exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'regions_id_seq\', 12)')

  return knex('regions').insert([
    {
      id: 1,
      country_id: 1,
      name: 'ACT'
    },
    {
      id: 2,
      country_id: 1,
      name: 'NSW'
    },
    {
      id: 3,
      country_id: 1,
      name: 'NT'
    },
    {
      id: 4,
      country_id: 1,
      name: 'QLD'
    },
    {
      id: 5,
      country_id: 1,
      name: 'SA'
    },
    {
      id: 6,
      country_id: 1,
      name: 'TAS'
    },
    {
      id: 7,
      country_id: 1,
      name: 'VIC'
    },
    {
      id: 8,
      country_id: 1,
      name: 'WA'
    },
    {
      id: 9,
      country_id: 2,
      name: 'NZ-AUK'
    },
    {
      id: 10,
      country_id: 2,
      name: 'NZ-WGN'
    },
    {
      id: 11,
      country_id: 2,
      name: 'NZ-CAN'
    }
  ])
}
