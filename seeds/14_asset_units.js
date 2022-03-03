exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'asset_units_id_seq\', 46)')

  return knex('asset_units').insert([
    {
      id: 1,
      name: 'Netball - SSN - LED - On Court',
      duration: '4.6min',
      price_fta: 3000,
      price_ppv: 3000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 2,
      name: 'Netball - SSN - TVC',
      duration: '30sec',
      price_fta: 3000,
      price_ppv: 3000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 3,
      name: 'Netball - SSN - Decal - On Court',
      duration: 'static',
      price_fta: 1000,
      price_ppv: 1000,
      fee_production: 200,
      fee_installation: 500
    },
    {
      id: 4,
      name: 'Netball - SSN - Package - Finals ',
      duration: 'n/a',
      price_fta: 20000,
      price_ppv: 20000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 5,
      name: 'Netball - International Constellation Cup - LED - On court',
      duration: '3.8 mins',
      price_fta: 2000,
      price_ppv: 2000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 6,
      name: 'Netball - International Constellation Cup - TVC ',
      duration: '30 secs',
      price_fta: 2000,
      price_ppv: 2000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 7,
      name: 'Netball - International Constellatin Cup - Decal - On court',
      duration: 'static ',
      price_fta: 1000,
      price_ppv: 1000,
      fee_production: 200,
      fee_installation: 500
    },
    {
      id: 8,
      name: 'Netball - International Constellatin Cup - Decal - Off court',
      duration: 'static',
      price_fta: 1000,
      price_ppv: 1000,
      fee_production: 200,
      fee_installation: 500
    },
    {
      id: 9,
      name: 'Netball - SSN Pre season Tournament - LED - On court',
      duration: '3 mins',
      price_fta: 2000,
      price_ppv: 2000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 10,
      name: 'Netball - SSN Pre season Tournament - TVC ',
      duration: '30 secs',
      price_fta: 2000,
      price_ppv: 2000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 11,
      name: 'Netball - SSN Pre season Tournament - Decal - On court',
      duration: 'static',
      price_fta: 1000,
      price_ppv: 1000,
      fee_production: 200,
      fee_installation: 500
    },
    {
      id: 12,
      name: 'SuperRugby - Waratahs - LED on field ',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 13,
      name: 'SuperRugby - Waratahs - LED Parapet - SCG ',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 14,
      name: 'SuperRugby - Waratahs - Virtual In-Goals',
      duration: 'static',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 15,
      name: 'SuperRugby - Waratahs - TVC - SCG',
      duration: '30 sec',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 16,
      name: 'SuperRugby - Reds - LED - On field ',
      duration: '4 mins ',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 17,
      name: 'SuperRugby - Reds - LED - Parapet ',
      duration: '4 mins ',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 18,
      name: 'SuperRugby - Rebels - LED - On field ',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 19,
      name: 'A-League - Adelaide United - LED - On Field',
      duration: '3 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 20,
      name: 'A-League - Adelaide United - TVC 30s ',
      duration: '30 secs',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 21,
      name: 'A-League - Brisbane Roar - LED - On Field',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 22,
      name: 'A-League - Brisbane Roar - LED - On Field',
      duration: '3 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 23,
      name: 'A-League - Central Coast Mariners - LED - On Field',
      duration: '3 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 24,
      name: 'A-League - Newcastle Jets - LED - On Field',
      duration: '3 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 25,
      name: 'A-League - Melbourne Victory - LED - On Field',
      duration: '3 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 26,
      name: 'A-League - Melbourne Victory - TVC 30s ',
      duration: '30 secs',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 27,
      name: 'A-League - Perth Glory - LED - On Field',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 28,
      name: 'A-League - Sydney FC - LED - On Field ',
      duration: '3 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 29,
      name: 'A-League - Sydney FC - LED Parapet',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 30,
      name: 'A-League - Sydney FC - TVC 30s',
      duration: '30 secs',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 31,
      name: 'A-League - Sydney FC - LED Parapet',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 32,
      name: 'A-League - Wellington Phoenix - LED - On Field ',
      duration: '3 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 33,
      name: 'A-League - Wellington Phoenix - TVC 45s',
      duration: '45 secs',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 34,
      name: 'AFL - Brisbane Lions - LED Perimeter/Superscreen ',
      duration: '5 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 35,
      name: 'AFL - Brisbane Lions - LED Perimeter/Superscreen ',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 36,
      name: 'AFL - Geelong Cats - LED Perimeter/Parapet',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 37,
      name: 'AFL - Gold Coast Suns - LED Perimeter ',
      duration: '5 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 38,
      name: 'AFL - Gold Coast Suns - LED Perimeter ',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 39,
      name: 'AFL - North Melbourne - LED Perimeter ',
      duration: '5 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 40,
      name: 'AFL - North Melbourne - LED Perimeter ',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 41,
      name: 'AFL - GWS Giants - LED Perimeter ',
      duration: '5 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 42,
      name: 'AFL - GWS Giants - LED Perimeter ',
      duration: '4 mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 43,
      name: 'AFL - Swans - LED Perimeter ',
      duration: '3.5mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 44,
      name: 'AFL - Swans - LED Parapet 120m ',
      duration: '3.5mins',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    },
    {
      id: 45,
      name: 'AFL - Swans - TVC 30s',
      duration: '30 secs',
      price_fta: 5000,
      price_ppv: 5000,
      fee_production: 0,
      fee_installation: 0
    }
  ])
}
