exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'assets_id_seq\', 213)')
  return knex('assets').insert([
    {
      id: 1,
      event_id: 1,
      asset_type_id: 7,
      asset_unit_id: 9,
      name: 'Netball - SSN Pre season Tournament - LED - On court',
      slots: 2
    },
    {
      id: 2,
      event_id: 1,
      asset_type_id: 11,
      asset_unit_id: 10,
      name: 'Netball - SSN Pre season Tournament - TVC ',
      slots: 1
    },
    {
      id: 3,
      event_id: 1,
      asset_type_id: 5,
      asset_unit_id: 11,
      name: 'Netball - SSN Pre season Tournament - Decal - On court',
      slots: 1
    },
    {
      id: 4,
      event_id: 2,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 5,
      event_id: 2,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 6,
      event_id: 2,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 7,
      event_id: 3,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 8,
      event_id: 3,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 9,
      event_id: 3,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 10,
      event_id: 4,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 11,
      event_id: 4,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 12,
      event_id: 4,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 13,
      event_id: 5,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 14,
      event_id: 5,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 15,
      event_id: 5,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 16,
      event_id: 6,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 17,
      event_id: 6,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 18,
      event_id: 6,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 19,
      event_id: 7,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 20,
      event_id: 7,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 21,
      event_id: 7,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 22,
      event_id: 8,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 23,
      event_id: 8,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 24,
      event_id: 8,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 25,
      event_id: 9,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 26,
      event_id: 9,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 27,
      event_id: 9,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 28,
      event_id: 10,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 29,
      event_id: 10,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 30,
      event_id: 10,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 31,
      event_id: 11,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 32,
      event_id: 11,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 33,
      event_id: 11,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 34,
      event_id: 12,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 35,
      event_id: 12,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 36,
      event_id: 12,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 37,
      event_id: 13,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 38,
      event_id: 13,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 39,
      event_id: 13,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 40,
      event_id: 14,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 41,
      event_id: 14,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 42,
      event_id: 14,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 43,
      event_id: 15,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 44,
      event_id: 15,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 45,
      event_id: 15,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 46,
      event_id: 16,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 47,
      event_id: 16,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 48,
      event_id: 16,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 49,
      event_id: 17,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 50,
      event_id: 17,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 51,
      event_id: 17,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 52,
      event_id: 18,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 53,
      event_id: 18,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 54,
      event_id: 18,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 55,
      event_id: 19,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 56,
      event_id: 19,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 57,
      event_id: 19,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 58,
      event_id: 20,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 59,
      event_id: 20,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 60,
      event_id: 20,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 61,
      event_id: 21,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 62,
      event_id: 21,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 63,
      event_id: 21,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 64,
      event_id: 22,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 65,
      event_id: 22,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 66,
      event_id: 22,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 67,
      event_id: 23,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 68,
      event_id: 23,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 69,
      event_id: 23,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 70,
      event_id: 24,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 71,
      event_id: 24,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 72,
      event_id: 24,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 73,
      event_id: 25,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 74,
      event_id: 25,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 75,
      event_id: 25,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 76,
      event_id: 26,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 77,
      event_id: 26,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 78,
      event_id: 26,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 79,
      event_id: 27,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 80,
      event_id: 27,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 81,
      event_id: 27,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 82,
      event_id: 28,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 83,
      event_id: 28,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 84,
      event_id: 28,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 85,
      event_id: 29,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 86,
      event_id: 29,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 87,
      event_id: 29,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 88,
      event_id: 30,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 89,
      event_id: 30,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 90,
      event_id: 30,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 91,
      event_id: 31,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 92,
      event_id: 31,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 93,
      event_id: 31,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 94,
      event_id: 32,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 95,
      event_id: 32,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 96,
      event_id: 32,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 97,
      event_id: 33,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 98,
      event_id: 33,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 99,
      event_id: 33,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 100,
      event_id: 34,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 101,
      event_id: 34,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 102,
      event_id: 34,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 103,
      event_id: 35,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 104,
      event_id: 35,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 105,
      event_id: 35,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 106,
      event_id: 36,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 107,
      event_id: 36,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 108,
      event_id: 36,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 109,
      event_id: 37,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 110,
      event_id: 37,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 111,
      event_id: 37,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 112,
      event_id: 38,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 113,
      event_id: 38,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 114,
      event_id: 38,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 115,
      event_id: 39,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 116,
      event_id: 39,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 117,
      event_id: 39,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 118,
      event_id: 40,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 119,
      event_id: 40,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 120,
      event_id: 40,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 121,
      event_id: 41,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 122,
      event_id: 41,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 123,
      event_id: 41,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 124,
      event_id: 42,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 125,
      event_id: 42,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 126,
      event_id: 42,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 127,
      event_id: 43,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 128,
      event_id: 43,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 129,
      event_id: 43,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 130,
      event_id: 44,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 131,
      event_id: 44,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 132,
      event_id: 44,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 133,
      event_id: 45,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 134,
      event_id: 45,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 135,
      event_id: 45,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 136,
      event_id: 46,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 137,
      event_id: 46,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 138,
      event_id: 46,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 139,
      event_id: 47,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 140,
      event_id: 47,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 141,
      event_id: 47,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 142,
      event_id: 48,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 143,
      event_id: 48,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 144,
      event_id: 48,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 145,
      event_id: 49,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 146,
      event_id: 49,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 147,
      event_id: 49,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 148,
      event_id: 50,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 149,
      event_id: 50,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 150,
      event_id: 50,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 151,
      event_id: 51,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 152,
      event_id: 51,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 153,
      event_id: 51,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 154,
      event_id: 52,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 155,
      event_id: 52,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 156,
      event_id: 52,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 157,
      event_id: 53,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 158,
      event_id: 53,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 159,
      event_id: 53,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 160,
      event_id: 54,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 161,
      event_id: 54,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 162,
      event_id: 54,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 163,
      event_id: 55,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 164,
      event_id: 55,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 165,
      event_id: 55,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 166,
      event_id: 56,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 167,
      event_id: 56,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 168,
      event_id: 56,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 169,
      event_id: 57,
      asset_type_id: 7,
      asset_unit_id: 1,
      name: 'Netball - SSN - LED - On Court',
      slots: 3
    },
    {
      id: 170,
      event_id: 57,
      asset_type_id: 11,
      asset_unit_id: 2,
      name: 'Netball - SSN - TVC',
      slots: 3
    },
    {
      id: 171,
      event_id: 57,
      asset_type_id: 5,
      asset_unit_id: 3,
      name: 'Netball - SSN - Decal - On Court',
      slots: 1
    },
    {
      id: 172,
      event_id: 58,
      asset_type_id: 7,
      asset_unit_id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      slots: 3
    },
    {
      id: 173,
      event_id: 65,
      asset_type_id: 7,
      asset_unit_id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      slots: 3
    },
    {
      id: 174,
      event_id: 71,
      asset_type_id: 7,
      asset_unit_id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      slots: 3
    },
    {
      id: 175,
      event_id: 76,
      asset_type_id: 7,
      asset_unit_id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      slots: 3
    },
    {
      id: 176,
      event_id: 80,
      asset_type_id: 7,
      asset_unit_id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      slots: 3
    },
    {
      id: 177,
      event_id: 62,
      asset_type_id: 7,
      asset_unit_id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      slots: 3
    },
    {
      id: 178,
      event_id: 62,
      asset_type_id: 7,
      asset_unit_id: 13,
      name: 'SuperRugby - Waratahs - LED Parapet - SCG ',
      slots: 6
    },
    {
      id: 179,
      event_id: 62,
      asset_type_id: 13,
      asset_unit_id: 14,
      name: 'SuperRugby - Waratahs - Virtual In-Goals',
      slots: 1
    },
    {
      id: 180,
      event_id: 62,
      asset_type_id: 11,
      asset_unit_id: 15,
      name: 'SuperRugby - Waratahs - TVC - SCG',
      slots: 1
    },
    {
      id: 181,
      event_id: 63,
      asset_type_id: 7,
      asset_unit_id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      slots: 3
    },
    {
      id: 182,
      event_id: 63,
      asset_type_id: 7,
      asset_unit_id: 13,
      name: 'SuperRugby - Waratahs - LED Parapet - SCG ',
      slots: 6
    },
    {
      id: 183,
      event_id: 63,
      asset_type_id: 13,
      asset_unit_id: 14,
      name: 'SuperRugby - Waratahs - Virtual In-Goals',
      slots: 1
    },
    {
      id: 184,
      event_id: 63,
      asset_type_id: 11,
      asset_unit_id: 15,
      name: 'SuperRugby - Waratahs - TVC - SCG',
      slots: 1
    },
    {
      id: 185,
      event_id: 70,
      asset_type_id: 7,
      asset_unit_id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      slots: 3
    },
    {
      id: 186,
      event_id: 70,
      asset_type_id: 7,
      asset_unit_id: 13,
      name: 'SuperRugby - Waratahs - LED Parapet - SCG ',
      slots: 6
    },
    {
      id: 187,
      event_id: 70,
      asset_type_id: 13,
      asset_unit_id: 14,
      name: 'SuperRugby - Waratahs - Virtual In-Goals',
      slots: 1
    },
    {
      id: 188,
      event_id: 70,
      asset_type_id: 11,
      asset_unit_id: 15,
      name: 'SuperRugby - Waratahs - TVC - SCG',
      slots: 1
    },
    {
      id: 189,
      event_id: 60,
      asset_type_id: 7,
      asset_unit_id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      slots: 2
    },
    {
      id: 190,
      event_id: 60,
      asset_type_id: 7,
      asset_unit_id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      slots: 2
    },
    {
      id: 191,
      event_id: 64,
      asset_type_id: 7,
      asset_unit_id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      slots: 2
    },
    {
      id: 192,
      event_id: 64,
      asset_type_id: 7,
      asset_unit_id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      slots: 2
    },
    {
      id: 193,
      event_id: 66,
      asset_type_id: 7,
      asset_unit_id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      slots: 2
    },
    {
      id: 194,
      event_id: 66,
      asset_type_id: 7,
      asset_unit_id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      slots: 2
    },
    {
      id: 195,
      event_id: 67,
      asset_type_id: 7,
      asset_unit_id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      slots: 2
    },
    {
      id: 196,
      event_id: 67,
      asset_type_id: 7,
      asset_unit_id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      slots: 2
    },
    {
      id: 197,
      event_id: 72,
      asset_type_id: 7,
      asset_unit_id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      slots: 2
    },
    {
      id: 198,
      event_id: 72,
      asset_type_id: 7,
      asset_unit_id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      slots: 2
    },
    {
      id: 199,
      event_id: 75,
      asset_type_id: 7,
      asset_unit_id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      slots: 2
    },
    {
      id: 200,
      event_id: 75,
      asset_type_id: 7,
      asset_unit_id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      slots: 2
    },
    {
      id: 201,
      event_id: 78,
      asset_type_id: 7,
      asset_unit_id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      slots: 2
    },
    {
      id: 202,
      event_id: 78,
      asset_type_id: 7,
      asset_unit_id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      slots: 2
    },
    {
      id: 203,
      event_id: 79,
      asset_type_id: 7,
      asset_unit_id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      slots: 2
    },
    {
      id: 204,
      event_id: 79,
      asset_type_id: 7,
      asset_unit_id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      slots: 2
    },
    {
      id: 205,
      event_id: 59,
      asset_type_id: 7,
      asset_unit_id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      slots: 2
    },
    {
      id: 206,
      event_id: 61,
      asset_type_id: 7,
      asset_unit_id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      slots: 2
    },
    {
      id: 207,
      event_id: 68,
      asset_type_id: 7,
      asset_unit_id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      slots: 2
    },
    {
      id: 208,
      event_id: 69,
      asset_type_id: 7,
      asset_unit_id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      slots: 2
    },
    {
      id: 209,
      event_id: 73,
      asset_type_id: 7,
      asset_unit_id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      slots: 2
    },
    {
      id: 210,
      event_id: 74,
      asset_type_id: 7,
      asset_unit_id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      slots: 2
    },
    {
      id: 211,
      event_id: 77,
      asset_type_id: 7,
      asset_unit_id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      slots: 2
    },
    {
      id: 212,
      event_id: 81,
      asset_type_id: 7,
      asset_unit_id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      slots: 2
    }
  ])
}
