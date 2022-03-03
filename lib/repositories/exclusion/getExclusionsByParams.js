'use strict'

const createRepositoryService = require('../repository')
const exclusionRepository = createRepositoryService('exclusions')

module.exports = function (brandCategoryIds) {
  const connection = exclusionRepository.getConnection()
  if (!Array.isArray(brandCategoryIds) || brandCategoryIds.length === 0) {
    return null
  }
  const validBrandCategoryIds = brandCategoryIds.filter((id) => !Number.isNaN(parseInt(id)))
  if (validBrandCategoryIds.length === 0) {
    return null
  }
  const criteriaSql = `WHERE ${connection.raw('exclusions_brand_categories.brand_category_id = ANY(?)', [validBrandCategoryIds])}`
  const sql = `
    WITH brand_categories AS (
      SELECT
        brand_categories.id,
        brand_categories.name,
        json_agg(DISTINCT brands.name) brand_names
      FROM
        brand_categories
      LEFT JOIN
        brands_brand_categories ON brand_categories.id=brands_brand_categories.brand_category_id
      LEFT JOIN
        brands ON brands_brand_categories.brand_id=brands.id
      GROUP BY
        brand_categories.id,
        brand_categories.name
      ORDER BY
        brand_categories.name
    )
    SELECT
      exclusions.id,
      exclusions.note,
      code_types.code_id,
      json_agg(DISTINCT exclusions_brand_categories.brand_category_id) exclusion_brand_categories,
      json_agg(brand_categories) brand_category_names,
      json_agg(DISTINCT exclusions_asset_types.asset_type_id) exclusion_asset_types,
      json_agg(DISTINCT asset_types.name) asset_type_names,
      json_agg(DISTINCT exclusions_clubs.club_id) exclusion_clubs,
      json_agg(DISTINCT exclusions_code_types.code_type_id) exclusion_code_types,
      json_agg(DISTINCT exclusions_venues.venue_id) exclusion_venues
    FROM
      exclusions
    INNER JOIN
      exclusions_brand_categories ON exclusions_brand_categories.exclusion_id=exclusions.id
    INNER JOIN
      brand_categories ON brand_categories.id=exclusions_brand_categories.brand_category_id
    LEFT JOIN
      exclusions_asset_types ON exclusions_asset_types.exclusion_id=exclusions.id
    LEFT JOIN
      asset_types ON asset_types.id=exclusions_asset_types.asset_type_id
    LEFT JOIN
      exclusions_clubs ON exclusions_clubs.exclusion_id=exclusions.id
    LEFT JOIN
      exclusions_code_types ON exclusions_code_types.exclusion_id=exclusions.id
    LEFT JOIN
      code_types ON code_types.id=exclusions_code_types.code_type_id
    LEFT JOIN
      exclusions_venues ON exclusions_venues.exclusion_id=exclusions.id
    ${criteriaSql}
    GROUP BY
      exclusions.id,code_types.code_id`
  return connection.raw(sql)
}
