'use strict'

const { packageStatuses } = require('../../config').static
const knex = require('../../db')

module.exports = search

function search (params, user) {
  const criteria = createSearchCriteriaSql(params, user)
  return knex.raw(`
    WITH packages_assets AS (
      SELECT
        packages_assets.asset_id,
        SUM(packages_assets.slots) slots
      FROM
        packages_assets
      INNER JOIN
        packages ON packages.id=packages_assets.package_id
      INNER JOIN
        package_statuses ON package_statuses.id=packages.package_status_id
      WHERE
        package_statuses.name='${packageStatuses.approved}'
      GROUP BY
        packages_assets.asset_id
    )
    SELECT
      codes.id codes_id,
      codes.name codes_name,
      events.id events_id,
      events.name events_name,
      events.round events_round,
      events.start_date events_start_date,
      events.end_date events_end_date,
      events.is_fta events_is_fta,
      events.is_ppv events_is_ppv,
      code_types.id code_types_id,
      code_types.name code_types_name,
      asset_types.id asset_types_id,
      asset_types.name asset_types_name,
      assets.id assets_id,
      assets.slots assets_slots,
      assets.slots - COALESCE(packages_assets.slots, 0) assets_available,
      asset_units.id asset_units_id,
      asset_units.name asset_units_name,
      asset_units.price_fta asset_units_price_fta,
      asset_units.price_ppv asset_units_price_ppv,
      asset_units.price_min asset_units_price_min,
      asset_units.fee_installation asset_units_fee_installation,
      asset_units.fee_production asset_units_fee_production,
      asset_units.duration asset_units_duration,
      CASE WHEN events.is_fta THEN asset_units.price_fta ELSE asset_units.price_ppv END assets_rate,
      (CASE WHEN events.is_fta THEN asset_units.price_fta ELSE asset_units.price_ppv END + COALESCE(asset_units.fee_installation, 0) + COALESCE(asset_units.fee_production, 0)) assets_price,
      asset_unit_links.id asset_unit_links_id,
      asset_unit_links.link asset_unit_links_link,
      venues.id venues_id,
      venues.name venues_name,
      clubs.id clubs_id,
      clubs.name clubs_name,
      regions.id regions_id,
      regions.name regions_name,
      countries.id countries_id,
      countries.name countries_name
    FROM
      codes
    INNER JOIN
      code_types ON code_types.code_id=codes.id
    INNER JOIN
      events ON events.code_type_id=code_types.id
    INNER JOIN
      assets ON assets.event_id=events.id
    INNER JOIN
      asset_types ON asset_types.id=assets.asset_type_id
    INNER JOIN
      asset_units ON asset_units.id=assets.asset_unit_id
    LEFT JOIN
      asset_unit_links ON asset_unit_links.asset_unit_id=asset_units.id AND TRIM(asset_unit_links.link) <> ''
    LEFT JOIN
      venues ON venues.id=events.venue_id
    LEFT JOIN
      clubs ON clubs.id=events.host_club_id
    LEFT JOIN
      regions ON regions.id=events.region_id
    LEFT JOIN
      countries ON countries.id=regions.country_id
    LEFT JOIN
      packages_assets ON packages_assets.asset_id=assets.id
    ${criteria}
    ORDER BY
      codes_name, events_name, events_round, code_types_name, asset_types_name, asset_units_name`)
}

function createSearchCriteriaSql (params, user) {
  const mapped = {
    code_id: 'codes.id',
    start_date: 'events.start_date',
    end_date: 'events.end_date',
    region_id: 'events.region_id',
    club_id: 'events.host_club_id',
    venue_id: 'events.venue_id',
    asset_type_id: 'asset_types.id'
  }

  const criteria = []

  Object.keys(mapped).forEach(key => {
    if (typeof params[key] !== 'undefined') {
      if (Array.isArray(params[key])) {
        // Filter out empty array member
        params[key] = params[key].filter((value) => value)
        if (params[key].length > 0) {
          criteria.push(knex.raw(`${mapped[key]} = ANY(?)`, [params[key]]))
        }
      } else {
        let searchOperator = '='
        let mappedKey = mapped[key]

        // Check if filter by date then query only date (ignore time)
        if (key === 'start_date') {
          mappedKey = 'start_date::date'
          searchOperator = '>='
        } else if (key === 'end_date') {
          mappedKey = 'end_date::date'
          searchOperator = '<='
        }

        criteria.push(knex.raw(`${mappedKey} ${searchOperator} ?`, params[key]))
      }
    }
  })

  if (params.only_available_asset || !user.isAdmin()) {
    criteria.push(knex.raw('(assets.slots - COALESCE(packages_assets.slots, 0)) > 0'))
  }
  return criteria.length ? `WHERE assets.archive != TRUE AND ${criteria.join(' AND ')}` : ''
}
