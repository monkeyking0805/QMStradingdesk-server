exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'asset_types_id_seq\', 14)')

  return knex('asset_types').insert([
    {
      id: 1,
      name: 'Activation'
    },
    {
      id: 2,
      name: 'Big Screen (TVC)'
    },
    {
      id: 4,
      name: 'Connected Stadium - WiFi & IPTV'
    },
    {
      id: 5,
      name: 'Decal'
    },
    {
      id: 6,
      name: 'Goal Post Pads'
    },
    {
      id: 7,
      name: 'LED'
    },
    {
      id: 10,
      name: 'Mini Bolsters'
    },
    {
      id: 11,
      name: 'TVC (Broadcast)'
    },
    {
      id: 12,
      name: 'V8 Supercars - Assets'
    },
    {
      id: 13,
      name: 'Virtual'
    },
    {
      id: 14,
      name: 'Packages'
    }
  ])
}
