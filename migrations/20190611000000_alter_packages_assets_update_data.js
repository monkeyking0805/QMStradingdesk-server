exports.up = async (knex, Promise) => {
  const assetsList = await knex.select().from('packages_assets')
  for (let i = 0; i < assetsList.length; i++) {
    const asset = assetsList[i]
    // You can use join for elegance code, but i'm prefer easiest way
    // Get Asset Detail
    const assetDetail = await knex.select().from('assets').where({ id: asset.asset_id }).first()

    // Get Event Detail
    const eventDetail = await knex.select().from('events').where({ id: assetDetail.event_id }).first()

    // Get Asset Unit Detail
    const assetUnitDetail = await knex.select().from('asset_units').where({ id: assetDetail.asset_unit_id }).first()

    const updatePrice = {
      market_rate: (eventDetail.is_fta) ? assetUnitDetail.price_fta : assetUnitDetail.price_ppv,
      installation_cost: assetUnitDetail.fee_installation,
      production_cost: assetUnitDetail.fee_production
    }
    await knex('packages_assets')
      .where({ id: asset.id })
      .update(updatePrice)
  }
  return null
}

exports.down = (knex, Promise) => {
  return null
}
