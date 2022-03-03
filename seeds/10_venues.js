exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'venues_id_seq\', 84)')

  return knex('venues').insert([
    {
      id: 1,
      name: '1300Smile Stadium'
    },
    {
      id: 2,
      name: 'AAMI Park'
    },
    {
      id: 3,
      name: 'Adelaide Entertainment Centre'
    },
    {
      id: 4,
      name: 'AIS Arena'
    },
    {
      id: 5,
      name: 'Allianz Stadium'
    },
    {
      id: 6,
      name: 'AMI Stadium Christchruch'
    },
    {
      id: 7,
      name: 'ANZ Stadium'
    },
    {
      id: 8,
      name: 'Barbagallo Raceway'
    },
    {
      id: 9,
      name: 'Belmore'
    },
    {
      id: 10,
      name: 'Blundstone Arena'
    },
    {
      id: 11,
      name: 'Brisbane Entertainment Centre'
    },
    {
      id: 12,
      name: 'Campbelltown Stadium'
    },
    {
      id: 13,
      name: 'Canberra Stadium '
    },
    {
      id: 14,
      name: 'Carrington Park'
    },
    {
      id: 15,
      name: 'CBUS Stadium'
    },
    {
      id: 16,
      name: 'Central Coast Stadium'
    },
    {
      id: 17,
      name: 'GABBA'
    },
    {
      id: 18,
      name: 'Gladstone Stadium'
    },
    {
      id: 19,
      name: 'Glen Willow (Mudgee)'
    },
    {
      id: 20,
      name: 'Gold Coast Sports Centre'
    },
    {
      id: 21,
      name: 'HBF Stadium'
    },
    {
      id: 22,
      name: 'Hidden Valley Raceway'
    },
    {
      id: 23,
      name: 'Hisense Arena'
    },
    {
      id: 24,
      name: 'ICC - Sydney'
    },
    {
      id: 25,
      name: 'Jubilee Stadium'
    },
    {
      id: 26,
      name: 'Leichhardt Oval'
    },
    {
      id: 27,
      name: 'Lottoland Oval (Brookvale)'
    },
    {
      id: 28,
      name: 'Mallala Motorsport Park'
    },
    {
      id: 29,
      name: 'Margaret Court Arena'
    },
    {
      id: 30,
      name: 'McDonalds Jones Stadium'
    },
    {
      id: 31,
      name: 'Metricon Stadium'
    },
    {
      id: 32,
      name: 'Mt Smart Stadium'
    },
    {
      id: 33,
      name: 'Mt. Panorama'
    },
    {
      id: 34,
      name: 'NIB Stadium'
    },
    {
      id: 35,
      name: 'Panthers Stadium'
    },
    {
      id: 36,
      name: 'Perth Arena'
    },
    {
      id: 37,
      name: 'Perth Stadium'
    },
    {
      id: 38,
      name: 'Priceline Stadium'
    },
    {
      id: 39,
      name: 'Qudos Arena'
    },
    {
      id: 40,
      name: 'Queensland Raceway'
    },
    {
      id: 41,
      name: 'Sandown Raceway'
    },
    {
      id: 42,
      name: 'SCG'
    },
    {
      id: 43,
      name: 'Silverdome'
    },
    {
      id: 44,
      name: 'Simonds Stadium'
    },
    {
      id: 45,
      name: 'SOPSC'
    },
    {
      id: 46,
      name: 'Southern Cross Stadium'
    },
    {
      id: 47,
      name: 'Spotless Stadium'
    },
    {
      id: 48,
      name: 'Suncorp Stadium'
    },
    {
      id: 49,
      name: 'Sydney Motorsport Park'
    },
    {
      id: 50,
      name: 'Symmons Plains Raceway'
    },
    {
      id: 51,
      name: 'Tamworth Stadium'
    },
    {
      id: 52,
      name: 'The Bend Motorsport Park'
    },
    {
      id: 53,
      name: 'TIO Stadium'
    },
    {
      id: 54,
      name: 'Toowoomba Stadium'
    },
    {
      id: 55,
      name: 'UNSW Canberra Stadium'
    },
    {
      id: 56,
      name: 'USC Sunshine Coast Stadium'
    },
    {
      id: 57,
      name: 'Wakefield Park Raceway'
    },
    {
      id: 58,
      name: 'WIN Stadium'
    },
    {
      id: 59,
      name: 'Winton Motor Raceway'
    },
    {
      id: 60,
      name: 'Bankwest Stadium '
    },
    {
      id: 61,
      name: 'Brisbane Arena '
    },
    {
      id: 62,
      name: 'Quay Centre '
    },
    {
      id: 63,
      name: 'Melbourne Arena '
    },
    {
      id: 64,
      name: 'GMHBA Stadium '
    },
    {
      id: 65,
      name: 'Adelaide Oval '
    },
    {
      id: 66,
      name: 'McDonalds Park (Wagga)'
    },
    {
      id: 67,
      name: 'GIO Stadium '
    },
    {
      id: 68,
      name: 'Scully Park '
    },
    {
      id: 69,
      name: 'Sunshine Coast Stadium '
    },
    {
      id: 70,
      name: 'Showground Stadium '
    },
    {
      id: 71,
      name: 'Bendigo Stadium '
    },
    {
      id: 72,
      name: 'RAC Arena'
    },
    {
      id: 73,
      name: 'Riverway Stadium'
    },
    {
      id: 74,
      name: 'Westpac Stadium'
    },
    {
      id: 75,
      name: 'Western Sydney Stadium'
    },
    {
      id: 76,
      name: 'Albert Park'
    },
    {
      id: 77,
      name: 'Adelaide Street Circuit'
    },
    {
      id: 78,
      name: 'Phillip Island Circuit'
    },
    {
      id: 79,
      name: 'Reid Park Street Circuit'
    },
    {
      id: 80,
      name: 'Pukekohe Park Raceway'
    },
    {
      id: 81,
      name: 'Surfers Paradise Street Circuit'
    },
    {
      id: 82,
      name: 'Newcastle Street Circuit'
    },
    {
      id: 83,
      name: 'Coopers Stadium '
    }
  ])
}
