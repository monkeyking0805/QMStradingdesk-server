exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'codes_clubs_id_seq\', 55)')

  return knex('codes_clubs').insert([
    {
      id: 1,
      club_id: 1,
      code_id: 1
    },
    {
      id: 2,
      club_id: 2,
      code_id: 1
    },
    {
      id: 3,
      club_id: 3,
      code_id: 1
    },
    {
      id: 4,
      club_id: 4,
      code_id: 1
    },
    {
      id: 5,
      club_id: 5,
      code_id: 1
    },
    {
      id: 6,
      club_id: 6,
      code_id: 1
    },
    {
      id: 7,
      club_id: 7,
      code_id: 1
    },
    {
      id: 8,
      club_id: 8,
      code_id: 1
    },
    {
      id: 9,
      club_id: 9,
      code_id: 1
    },
    {
      id: 10,
      club_id: 10,
      code_id: 2
    },
    {
      id: 11,
      club_id: 11,
      code_id: 2
    },
    {
      id: 12,
      club_id: 12,
      code_id: 2
    },
    {
      id: 13,
      club_id: 13,
      code_id: 2
    },
    {
      id: 14,
      club_id: 14,
      code_id: 2
    },
    {
      id: 15,
      club_id: 15,
      code_id: 2
    },
    {
      id: 16,
      club_id: 16,
      code_id: 2
    },
    {
      id: 17,
      club_id: 17,
      code_id: 2
    },
    {
      id: 18,
      club_id: 18,
      code_id: 2
    },
    {
      id: 19,
      club_id: 19,
      code_id: 2
    },
    {
      id: 20,
      club_id: 20,
      code_id: 3
    },
    {
      id: 21,
      club_id: 21,
      code_id: 3
    },
    {
      id: 22,
      club_id: 22,
      code_id: 3
    },
    {
      id: 23,
      club_id: 23,
      code_id: 3
    },
    {
      id: 24,
      club_id: 24,
      code_id: 4
    },
    {
      id: 25,
      club_id: 25,
      code_id: 5
    },
    {
      id: 26,
      club_id: 26,
      code_id: 5
    },
    {
      id: 27,
      club_id: 27,
      code_id: 5
    },
    {
      id: 28,
      club_id: 28,
      code_id: 5
    },
    {
      id: 29,
      club_id: 29,
      code_id: 5
    },
    {
      id: 30,
      club_id: 30,
      code_id: 5
    },
    {
      id: 31,
      club_id: 31,
      code_id: 5
    },
    {
      id: 32,
      club_id: 32,
      code_id: 5
    },
    {
      id: 33,
      club_id: 33,
      code_id: 5
    },
    {
      id: 34,
      club_id: 34,
      code_id: 6
    },
    {
      id: 35,
      club_id: 35,
      code_id: 6
    },
    {
      id: 36,
      club_id: 36,
      code_id: 6
    },
    {
      id: 37,
      club_id: 37,
      code_id: 6
    },
    {
      id: 38,
      club_id: 38,
      code_id: 6
    },
    {
      id: 39,
      club_id: 39,
      code_id: 6
    },
    {
      id: 40,
      club_id: 40,
      code_id: 6
    },
    {
      id: 41,
      club_id: 41,
      code_id: 6
    },
    {
      id: 42,
      club_id: 42,
      code_id: 6
    },
    {
      id: 43,
      club_id: 43,
      code_id: 6
    },
    {
      id: 44,
      club_id: 44,
      code_id: 6
    },
    {
      id: 45,
      club_id: 45,
      code_id: 6
    },
    {
      id: 46,
      club_id: 46,
      code_id: 6
    },
    {
      id: 47,
      club_id: 47,
      code_id: 6
    },
    {
      id: 48,
      club_id: 48,
      code_id: 6
    },
    {
      id: 49,
      club_id: 49,
      code_id: 6
    },
    {
      id: 50,
      club_id: 50,
      code_id: 6
    },
    {
      id: 51,
      club_id: 51,
      code_id: 6
    },
    {
      id: 52,
      club_id: 52,
      code_id: 7
    },
    {
      id: 53,
      club_id: 53,
      code_id: 7
    },
    {
      id: 54,
      club_id: 54,
      code_id: 7
    },
    {
      id: 55,
      club_id: 55,
      code_id: 8
    }
  ])
}
