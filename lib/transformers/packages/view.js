'use strict'

module.exports = {
  transform
}

function transformAssetEvent (assetEvent) {
  return {
    id: assetEvent.id,
    name: assetEvent.name,
    round: assetEvent.round,
    startDate: assetEvent.start_date,
    endDate: assetEvent.end_date,
    isFta: assetEvent.is_fta,
    isPpv: assetEvent.is_ppv,
    codeType: assetEvent.event_code_type,
    venue: assetEvent.event_venue,
    hostClub: assetEvent.event_host_club,
    region: assetEvent.event_region,
    country: assetEvent.event_country
  }
}

function transformAssetDetail (assetEvent) {
  return {
    sportDetail: assetEvent.event_code,
    eventDetail: transformAssetEvent(assetEvent)
  }
}

function transformAsset (rawAsset) {
  const {
    asset,
    market_rate: marketRate,
    production_cost: productionCost,
    installation_cost: installationCost
  } = rawAsset
  return {
    id: asset.id,
    available: Number.parseInt(asset.slots_available),
    assetType: asset.asset_type,
    assetUnit: {
      id: asset.asset_unit.id,
      name: asset.asset_unit.name,
      links: asset.asset_unit.links.filter((assetUnitLink) => assetUnitLink.id && assetUnitLink.link),
      duration: asset.asset_unit.duration
    },
    rate: marketRate,
    price: marketRate + productionCost + installationCost,
    fees: {
      installation: installationCost,
      production: productionCost
    },
    assetDetail: transformAssetDetail(asset.asset_event)
  }
}

function transform (rawData) {
  return {
    id: rawData.id,
    name: rawData.name,
    reference_id: rawData.reference_id,
    notes: rawData.notes || '',
    brandCategories: rawData.brand_categories,
    client: rawData.client,
    status: rawData.status,
    assetsSelected: rawData.selected_assets.map((asset) => {
      return {
        id: asset.id,
        quantity: asset.slots,
        price: asset.slots * asset.asset.price,
        bonus: asset.bonus,
        asset: transformAsset(asset)
      }
    })
  }
}
