const debug = require('debug')('qms-tradingdesk-server:controllers:qlik')
const error = require('debug')('qms-tradingdesk-server:controllers:qlik:error')
const packageRepository = require('../../repositories/package')
const region = require('../../repositories/region')
const {
  static: { packageListOrderByColumns }
} = require('../../config')
const paginateHelper = require('../../helpers/paginate')

function getListParameters (ctx) {
  const { page, itemsPerPage } = paginateHelper.getUrlParameters(ctx)
  return {
    page,
    itemsPerPage,
    orderBy: 'name',
    search: ''
  }
}
const getPackagesList = async (ctx) => {
  debug(getPackagesList.name)
  try {
    const {
      page,
      itemsPerPage,
      orderBy
    } = getListParameters(ctx)

    const bookingList = await packageRepository.exportList(0, page, itemsPerPage, packageListOrderByColumns[orderBy], '')
    const regionsList = await region.all()

    const reportResult = bookingList.rows.map(booking => {
      const regionDetail = regionsList.find(region => region.id === booking.user.region_id)
      return {
        scheduleCode: booking.reference_id,
        scheduleClientName: `${booking.client.company_name}`,
        scheduleBookingName: booking.name,
        brandCategory: booking.brand_categories.map(brandCategory => brandCategory.name).join('; '),
        scheduleAgencyName: booking.client.agency_name,
        salesOfficeCode: regionDetail ? regionDetail.name : '',
        salesRepName: `${booking.user.firstname} ${booking.user.lastname}`,
        scheduleStartDate: booking.event_first_date,
        scheduleEndDate: booking.event_last_date,
        selectedAsset: booking.selected_assets.map(selectedAsset => {
          const { asset } = selectedAsset
          const clientRate = selectedAsset.market_rate
          return {
            assetDetail: {
              id: asset.id,
              assetStartDate: asset.asset_event.start_date,
              assetEndDate: asset.asset_event.end_date,
              assetDuration: asset.asset_unit.duration,
              assetMarketRate: selectedAsset.market_rate * selectedAsset.slots,
              assetClientRate: clientRate * selectedAsset.slots,
              assetQuantity: selectedAsset.slots,
              assetCost: asset.asset_unit.cost,
              assetProductionCost: selectedAsset.production_cost * selectedAsset.slots,
              assetInstallationCost: selectedAsset.installation_cost * selectedAsset.slots,
              bonus: selectedAsset.bonus,
              bonusValue: (clientRate + selectedAsset.production_cost + selectedAsset.installation_cost) * selectedAsset.slots,
              assetType: {
                name: asset.asset_type.name
              },
              assetUnit: {
                name: asset.asset_unit.name
              }
            },
            eventDetail: {
              id: asset.asset_event.id,
              eventFixture: asset.asset_event.name,
              sportCode: asset.asset_event.event_code.name,
              eventType: asset.asset_event.event_code_type.name,
              club: asset.asset_event.event_host_club.name,
              venue: asset.asset_event.event_venue.name,
              state: asset.asset_event.event_region.name,
              round: asset.asset_event.round,
              broadcast: asset.asset_event.is_fta ? 'SIMULCAST' : 'STV'
            }
          }
        })
      }
    })
    /*
    const reportResult = []
    for (let i = 0; i < bookingList.rows.length; i++) {
      const booking = bookingList.rows[i]
      booking.selected_assets.forEach(selectedAsset => {
        reportResult.push({
          scheduleCode: booking.reference_id,
          scheduleClientName: `${booking.client.firstname} ${booking.client.lastname}`,
          scheduleBookingName: booking.name,
          brandCategory: booking.brand_categories.map(brandCategory => brandCategory.name).join('; '),
          scheduleAgencyName: booking.client.agency_name,
          salesOfficeCode: '',
          salesRepName: `${booking.user.firstname} ${booking.user.lastname}`,
          scheduleStartDate: booking.event_first_date,
          scheduleEndDate: booking.event_last_date,
          asset: {
            id: selectedAsset.asset.id,
            assetStartDate: selectedAsset.asset.asset_event.start_date,
            assetEndDate: selectedAsset.asset.asset_event.end_date,
            assetQuantity: selectedAsset.asset.slots,
            assetDuration: selectedAsset.asset.asset_unit.duration,
            assetCost: selectedAsset.asset.asset_unit.cost,
            assetMarketRate: selectedAsset.market_rate,
            assetClientRate: '',
            assetProductionCost: selectedAsset.production_cost,
            assetInstallationCost: selectedAsset.installation_cost,
            bonus: selectedAsset.is_free,
            assetType: {
              name: selectedAsset.asset.asset_type.name
            },
            assetUnit: {
              name: selectedAsset.asset.asset_unit.name
            }
          },
          event: {
            id: selectedAsset.asset.asset_event.id,
            eventFixture: selectedAsset.asset.asset_event.name,
            sportCode: selectedAsset.asset.asset_event.event_code.name,
            eventType: selectedAsset.asset.asset_event.event_code_type.name,
            club: selectedAsset.asset.asset_event.event_host_club.name,
            venue: selectedAsset.asset.asset_event.event_venue.name,
            state: selectedAsset.asset.asset_event.event_region.name,
            round: selectedAsset.asset.asset_event.round,
            broadcast: selectedAsset.asset.asset_event.event_host_club.name
          }
        })
      })
    }
    */

    ctx.ok({
      reportResult,
      parameters: ctx.request.query
    })
  } catch (err) {
    error(getPackagesList.name, err)
    err.expose = true
    throw err
  }
}

module.exports = {
  getPackagesList
}
