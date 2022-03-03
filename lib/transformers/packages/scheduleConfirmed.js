'use strict'
const { displayCurrencyFormat } = require('../../helpers/utils')

module.exports = {
  transform
}

function transformUserName (user) {
  const firstName = user.firstname.trim()
  const lastName = (user.lastname || '').trim()

  return lastName ? `${firstName} ${lastName}` : firstName
}

function transform (rawData) {
  let total = 0
  const assets = rawData.selected_assets.map((asset) => {
    const assetPrice = asset.market_rate
    total += asset.slots * (assetPrice + asset.production_cost + asset.installation_cost)
    const startDate = asset.asset.asset_event.start_date.substr(0, 10)
    const endDate = asset.asset.asset_event.end_date.substr(0, 10)
    return {
      code: asset.asset.asset_event.event_code.name,
      date: (startDate === endDate) ? startDate : `${startDate} - ${endDate}`,
      eventName: asset.asset.asset_event.name,
      venueName: asset.asset.asset_event.event_venue.name,
      assetName: asset.asset.asset_unit.name,
      slots: asset.slots,
      duration: asset.asset.asset_unit.duration
    }
  })
  return {
    bookingName: rawData.name,
    total: displayCurrencyFormat(total),
    clientName: rawData.client.company_name || '-',
    agencyName: rawData.client.agency_name || '-',
    brandCategories: rawData.brand_categories.map((brandCategory) => brandCategory.name).join(', ') || '-',
    userName: transformUserName(rawData.user),
    notes: rawData.notes || '-',
    assets
  }
}
