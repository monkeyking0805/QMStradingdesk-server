exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'asset_unit_links_id_seq\', 19)')

  return knex('asset_unit_links').insert([
    {
      id: 1,
      asset_unit_id: 1,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_SpecsCA_15s.pdf'
    },
    {
      id: 2,
      asset_unit_id: 2,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/BigScreen_TVC_30s.pdf'
    },
    {
      id: 3,
      asset_unit_id: 3,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_Specs_Decals_5mx1m.pdf'
    },
    {
      id: 4,
      asset_unit_id: 4,
      link: ''
    },
    {
      id: 5,
      asset_unit_id: 5,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_SpecsCA_InternationalTestSeries.pdf'
    },
    {
      id: 6,
      asset_unit_id: 6,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/BigScreen_TVC_30s.pdf'
    },
    {
      id: 7,
      asset_unit_id: 7,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_Specs_Decals_5mx1m.pdf'
    },
    {
      id: 8,
      asset_unit_id: 8,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_Specs_Decals_5mx1m.pdf'
    },
    {
      id: 9,
      asset_unit_id: 9,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_SpecsCA_15s.pdf'
    },
    {
      id: 10,
      asset_unit_id: 10,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/BigScreen_TVC_30s.pdf'
    },
    {
      id: 11,
      asset_unit_id: 11,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_Specs_Decals_5mx1m.pdf'
    },
    {
      id: 12,
      asset_unit_id: 12,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/QMS_SpecSheet_SuperRugby_CA_Waratahs_Field_2018.pdf'
    },
    {
      id: 13,
      asset_unit_id: 13,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/QMS_SpecSheet_SuperRugby_CA_Waratahs_Field_2018.pdf'
    },
    {
      id: 14,
      asset_unit_id: 14,
      link: ''
    },
    {
      id: 15,
      asset_unit_id: 15,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/BigScreen_TVC_30s.pdf'
    },
    {
      id: 16,
      asset_unit_id: 16,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/QMS_SpecSheet_SuperRugby_CA_QueenslandReds_2018.pdf'
    },
    {
      id: 17,
      asset_unit_id: 17,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/QMS_SpecSheet_SuperRugby_CA_QueenslandReds_2018.pdf'
    },
    {
      id: 18,
      asset_unit_id: 18,
      link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/QMS_SpecSheet_SuperRugby_CA_MelbourneRebels_Field_2018.pdf'
    }
  ])
}
