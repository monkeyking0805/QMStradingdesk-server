'use strict'

const { toArray } = require('../../helpers/utils')
const _ = require('lodash')

module.exports = {
  transform
}

function isExclusionsMatch (exclusions, value) {
  return (exclusions === null) || (Array.isArray(exclusions) && exclusions.includes(value))
}

/**
 * Match the exlusions to event by given clubs, code types and venues.
 * Return result is the array of asset id to be excluded for that event
 * @param {array} exclusionsForCode All exclusions for single sport code
 * @param {array} assetExclusionForEvent Variable to keep an array of asset id to be excluded (accumulated, unique)
 * @param {any} record queried record from DB
 */
function getAssetTypesExclusionsForEvent (exclusionsForCode, record) {
  const assetTypeExclusionsForEvent = []
  const excludeAssetType = []
  let excludeAll = false
  for (const exclusion of exclusionsForCode) {
    const {
      exclusion_asset_types: exclusionAssetTypes,
      exclusion_clubs: exclusionClubs,
      exclusion_code_types: exclusionCodeTypes,
      exclusion_venues: exclusionVenues
    } = exclusion
    const isMatchCodeTypes = isExclusionsMatch(exclusionCodeTypes, record.code_types_id)
    const isMatchClubs = isExclusionsMatch(exclusionClubs, record.clubs_id)
    const isMatchVenues = isExclusionsMatch(exclusionVenues, record.venues_id)

    // In case of exclusionAssetTypes === null, meaning everything must be excluded
    // This function will return null to state that all asset must be excluded
    if (isMatchCodeTypes && isMatchClubs && isMatchVenues) {
      if (Array.isArray(exclusionAssetTypes)) {
        excludeAssetType.push(_.union(assetTypeExclusionsForEvent, exclusionAssetTypes))
      } else {
        excludeAll = true
      }
    }
  }
  return (excludeAll) ? null : _.flattenDeep(excludeAssetType)
}
/**
 * Clean up data with [ null ] to null. Remove duplicated result in brand_category_names property
 */
function cleanUpExclusionResult (exclusions) {
  return (exclusions === null) ? null : exclusions.rows.map((exclusion) => {
    Object.keys(exclusion).forEach(key => {
      const value = exclusion[key]
      if (Array.isArray(value) && (value.length === 1) && (value[0] === null)) {
        exclusion[key] = null
      } else if (key === 'brand_category_names') {
        const brandCategoryNames = _.uniq(value.map(name => JSON.stringify(name)))
        exclusion[key] = brandCategoryNames.map(item => JSON.parse(item))
      }
    })
    return exclusion
  })
}

function transform (result, exclusions, searchParameters, user) {
  const { only_available_asset: onlyAvailableAsset } = searchParameters
  const mustDisplayOnlyAvailableAsset = !user.isAdmin() || onlyAvailableAsset
  const codes = {}
  exclusions = cleanUpExclusionResult(exclusions)
  let exclusionsForCode = []
  for (const record of result.rows) {
    const {
      codes_id: codeId,
      events_id: eventId,
      assets_id: assetId
    } = record

    if (!codes[codeId]) {
      codes[codeId] = {
        id: record.codes_id,
        name: record.codes_name,
        events: {}
      }
      exclusionsForCode = Array.isArray(exclusions) ? exclusions.filter((exclusion) => (exclusion.code_id === null) || (exclusion.code_id === codeId)) : []
    }

    if (!codes[codeId].events[eventId]) {
      codes[codeId].events[eventId] = {
        id: record.events_id,
        name: record.events_name,
        round: record.events_round,
        startDate: record.events_start_date,
        endDate: record.events_end_date,
        isFta: record.events_is_fta === true,
        isPpv: record.events_is_ppv === true,
        codeType: {
          id: record.code_types_id,
          name: record.code_types_name
        },
        assets: {},
        venue: !record.venues_id ? null : {
          id: record.venues_id,
          name: record.venues_name
        },
        hostClub: !record.clubs_id ? null : {
          id: record.clubs_id,
          name: record.clubs_name
        },
        region: !record.regions_id ? null : {
          id: record.regions_id,
          name: record.regions_name
        },
        country: !record.countries_id ? null : {
          id: record.countries_id,
          name: record.countries_name
        }
      }
    }
    const assetTypeExclusionsForEvent = getAssetTypesExclusionsForEvent(exclusionsForCode, record)
    const shouldAssetTypeBeIncluded = Array.isArray(assetTypeExclusionsForEvent) && !assetTypeExclusionsForEvent.includes(record.asset_types_id)
    if (!codes[codeId].events[eventId].assets[assetId] && (!mustDisplayOnlyAvailableAsset || shouldAssetTypeBeIncluded)) {
      codes[codeId].events[eventId].assets[assetId] = {
        id: record.assets_id,
        name: record.assets_name,
        slots: record.assets_slots,
        available: Number.parseInt(record.assets_available),
        assetType: {
          id: record.asset_types_id,
          name: record.asset_types_name
        },
        assetUnit: {
          id: record.asset_units_id,
          name: record.asset_units_name,
          links: [],
          duration: record.asset_units_duration
        },
        rate: record.assets_rate,
        fees: {
          installation: record.asset_units_fee_installation,
          production: record.asset_units_fee_production
        },
        price: record.assets_price,
        is_excluded: (assetTypeExclusionsForEvent === null) || assetTypeExclusionsForEvent.includes(record.asset_types_id)
      }
    }

    if (codes[codeId].events[eventId].assets[assetId] && record.asset_unit_links_id && record.asset_unit_links_link) {
      codes[codeId].events[eventId].assets[assetId].assetUnit.links.push({
        id: record.asset_unit_links_id,
        link: record.asset_unit_links_link
      })
    }
  }
  return {
    codes: {
      codes: toArray(codes, (code) => {
        code.events = toArray(code.events, (event) => {
          event.assets = toArray(event.assets)
        }).filter((event) => Array.isArray(event.assets) && (event.assets.length > 0))
          // Order by event date (Can't do order default by query due it need to transform with exclusions)
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      })
    }.codes.map(code => {
      if (code.events.length !== 0) {
        return code
      }
    }).filter((item) => item !== undefined)
  }
}
