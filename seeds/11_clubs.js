exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'clubs_id_seq\', 55)')

  return knex('clubs').insert([
    {
      id: 1,
      name: 'Perth Glory'
    },
    {
      id: 2,
      name: 'Melbourne Victory'
    },
    {
      id: 3,
      name: 'Sydney FC'
    },
    {
      id: 4,
      name: 'Adelaide United'
    },
    {
      id: 5,
      name: 'Melbourne City FC'
    },
    {
      id: 6,
      name: 'Brisbane Roar FC'
    },
    {
      id: 7,
      name: 'Newcastle Jets'
    },
    {
      id: 8,
      name: 'Wellington Phoenix'
    },
    {
      id: 9,
      name: 'Central Coast Mariners'
    },
    {
      id: 10,
      name: 'GWS Giants'
    },
    {
      id: 11,
      name: 'North Melbourne'
    },
    {
      id: 12,
      name: 'Gold Coast Suns'
    },
    {
      id: 13,
      name: 'Geelong Cats'
    },
    {
      id: 14,
      name: 'West Coast Eagles'
    },
    {
      id: 15,
      name: 'Port Adelaide'
    },
    {
      id: 16,
      name: 'Adelaide Crows'
    },
    {
      id: 17,
      name: 'Sydney Swans'
    },
    {
      id: 18,
      name: 'Brisbane Lions'
    },
    {
      id: 19,
      name: 'Fremantle'
    },
    {
      id: 20,
      name: 'T20'
    },
    {
      id: 21,
      name: 'ODI'
    },
    {
      id: 22,
      name: 'BBL Sixers '
    },
    {
      id: 23,
      name: 'Test match'
    },
    {
      id: 24,
      name: 'Sydney Kings '
    },
    {
      id: 25,
      name: 'Sunshine Coast Lightning'
    },
    {
      id: 26,
      name: 'NSW Swifts'
    },
    {
      id: 27,
      name: 'Melbourne Vixens'
    },
    {
      id: 28,
      name: 'West Coast Fever'
    },
    {
      id: 29,
      name: 'Collingwood Magpies Netball'
    },
    {
      id: 30,
      name: 'Giants Netball'
    },
    {
      id: 31,
      name: 'Queensland Firebirds'
    },
    {
      id: 32,
      name: 'Adelaide Thunderbirds'
    },
    {
      id: 33,
      name: 'Diamonds '
    },
    {
      id: 34,
      name: 'Cronulla Sharks'
    },
    {
      id: 35,
      name: 'Manly Sea Eagles'
    },
    {
      id: 36,
      name: 'Parramatta Eels'
    },
    {
      id: 37,
      name: 'Gold Coast Titans'
    },
    {
      id: 38,
      name: 'Canberra Raiders'
    },
    {
      id: 39,
      name: 'Melbourne Storm'
    },
    {
      id: 40,
      name: 'Brisbane Broncos'
    },
    {
      id: 41,
      name: 'Canterbury-Bankstown Bulldogs'
    },
    {
      id: 42,
      name: 'North Queensland Cowboys'
    },
    {
      id: 43,
      name: 'Newcastle Knights'
    },
    {
      id: 44,
      name: 'Penrith Panthers'
    },
    {
      id: 45,
      name: 'South Sydney Rabbitohs'
    },
    {
      id: 46,
      name: 'St George Illawarra Dragons'
    },
    {
      id: 47,
      name: 'Sydney Roosters'
    },
    {
      id: 48,
      name: 'New Zealand Warriors'
    },
    {
      id: 49,
      name: 'Wests Tigers'
    },
    {
      id: 50,
      name: 'NSW Blues'
    },
    {
      id: 51,
      name: 'QLD Maroons'
    },
    {
      id: 52,
      name: 'Queensland Reds'
    },
    {
      id: 53,
      name: 'Melbourne Rebels'
    },
    {
      id: 54,
      name: 'NSW Waratahs'
    },
    {
      id: 55,
      name: 'V8 Super Cars'
    }
  ])
}
