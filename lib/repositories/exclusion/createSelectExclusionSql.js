'use strict'

const normalSelects = `
exclusions.id,
COALESCE(exclusions_asset_types.json, '[]') asset_types,
COALESCE(exclusions_brand_categories.json, '[]') brand_categories,
COALESCE(exclusions_brands.json, '[]') brands,
COALESCE(exclusions_clubs.json, '[]') clubs,
COALESCE(exclusions_code_types.json, '[]') code_types,
COALESCE(exclusions_code_types.json_codes, '[]') codes,
COALESCE(exclusions_venues.json, '[]') venues,
exclusions.note`
const countSelect = 'COUNT(DISTINCT exclusions.id)'
const withStatement = `
  WITH exclusions_asset_types AS (
    SELECT
      e.exclusion_id,
      JSON_AGG((SELECT sub FROM (SELECT asset_types.id,asset_types.name) sub)) json
    FROM
      exclusions_asset_types e
    INNER JOIN
      asset_types ON e.asset_type_id=asset_types.id
    GROUP BY
      e.exclusion_id
  ),
  exclusions_brand_categories AS (
    SELECT
      e.exclusion_id,
      JSON_AGG((SELECT sub FROM (SELECT brand_categories.id,brand_categories.name) sub)) json
    FROM
      exclusions_brand_categories e
    INNER JOIN
      brand_categories ON e.brand_category_id=brand_categories.id
    GROUP BY
      e.exclusion_id
  ),
  exclusions_brands AS (
    SELECT
      e.exclusion_id,
      JSON_AGG((SELECT sub FROM (SELECT brands.id,brands.name) sub)) json
    FROM
      exclusions_brands e
    INNER JOIN
      brands ON e.brand_id=brands.id
    GROUP BY
      e.exclusion_id
  ),
  exclusions_clubs AS (
    SELECT
      e.exclusion_id,
      JSON_AGG((SELECT sub FROM (SELECT clubs.id,clubs.name) sub)) json
    FROM
      exclusions_clubs e
    INNER JOIN
      clubs ON e.club_id=clubs.id
    GROUP BY
      e.exclusion_id
  ),
  exclusions_code_types AS (
    SELECT
      e.exclusion_id,
      JSON_AGG((SELECT sub FROM (SELECT code_types.id,code_types.name) sub)) json,
      JSON_AGG((SELECT sub FROM (SELECT codes.id,codes.name) sub)) json_codes
    FROM
      exclusions_code_types e
    INNER JOIN
      code_types ON e.code_type_id=code_types.id
    INNER JOIN
      codes ON code_types.code_id=codes.id
    GROUP BY
      e.exclusion_id
  ),
  exclusions_venues AS (
    SELECT
      e.exclusion_id,
      JSON_AGG((SELECT sub FROM (SELECT venues.id,venues.name) sub)) json
    FROM
      exclusions_venues e
    INNER JOIN
      venues ON e.venue_id=venues.id
    GROUP BY
      e.exclusion_id
  )`
const orderByStatement = 'ORDER BY exclusions.id'

module.exports = function (conditionsStatement = '', limitStatement = '', isCount = false) {
  const sql = `
    ${getWithStatement(isCount)}
    SELECT
    ${getSelectStatement(isCount)}
    FROM
      exclusions
    LEFT JOIN
      exclusions_asset_types ON exclusions.id=exclusions_asset_types.exclusion_id
    LEFT JOIN
      exclusions_brand_categories ON exclusions.id=exclusions_brand_categories.exclusion_id
    LEFT JOIN
      exclusions_brands ON exclusions.id=exclusions_brands.exclusion_id
    LEFT JOIN
      exclusions_clubs ON exclusions.id=exclusions_clubs.exclusion_id
    LEFT JOIN
      exclusions_code_types ON exclusions.id=exclusions_code_types.exclusion_id
    LEFT JOIN
      exclusions_venues ON exclusions.id=exclusions_venues.exclusion_id
    ${conditionsStatement}
    ${getOrderByStatement(isCount)}
    ${limitStatement}`
  return sql
}

function getSelectStatement (isCount) {
  return isCount ? countSelect : normalSelects
}

function getWithStatement (isCount) {
  return isCount ? '' : withStatement
}

function getOrderByStatement (isCount) {
  return isCount ? '' : orderByStatement
}
