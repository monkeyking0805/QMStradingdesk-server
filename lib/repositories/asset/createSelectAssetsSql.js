'use strict'

const normalSelects = `
  assets.id,
  assets.slots,
  assets.archive,
  ROW_TO_JSON((SELECT sub FROM (SELECT asset_types.id,asset_types.name) sub)) assettype,
  ROW_TO_JSON((SELECT sub FROM (SELECT asset_units.id,asset_units.name,asset_units.duration,asset_units.fee_installation,asset_units.fee_production,asset_units.price_fta,asset_units.price_ppv,asset_units.price_min) sub)) assetunit,
  ROW_TO_JSON((SELECT sub FROM (SELECT code_types.id,code_types.name) sub)) codetype,
  ROW_TO_JSON((SELECT sub FROM (SELECT codes.id,codes.name) sub)) code,
  ROW_TO_JSON((SELECT sub FROM (SELECT events.id,events.name) sub)) _event`
const countSelect = 'COUNT(DISTINCT assets.id)'

module.exports = function (conditionsStatement = '', limitStatement = '', orderByStatement = '', isCount = false) {
  const sql = `
    SELECT
      ${getSelectStatement(isCount)}
    FROM
      assets
    INNER JOIN
      asset_types ON assets.asset_type_id=asset_types.id
    INNER JOIN
      asset_units ON assets.asset_unit_id=asset_units.id
    INNER JOIN
      events ON assets.event_id=events.id
    INNER JOIN
      code_types ON events.code_type_id=code_types.id
    INNER JOIN
      codes ON code_types.code_id=codes.id
    
    ${conditionsStatement}
    ${isCount ? '' : orderByStatement}
    ${isCount ? '' : limitStatement}
    `
  return sql
}

function getSelectStatement (isCount) {
  return isCount ? countSelect : normalSelects
}
