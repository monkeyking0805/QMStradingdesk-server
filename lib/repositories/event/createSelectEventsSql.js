'use strict'

const withs = `
  WITH _code_types AS (
    SELECT
      code_types.id,
      codes.id code_id,
      ROW_TO_JSON((SELECT sub FROM (SELECT code_types.id,code_types.name) sub)) json_code_types,
      ROW_TO_JSON((SELECT sub FROM (SELECT codes.id,codes.name) sub)) json_codes   
    FROM
      code_types
    INNER JOIN
      codes ON code_types.code_id=codes.id
  ),
  _venues AS (
    SELECT
      venues.id,
      ROW_TO_JSON((SELECT sub FROM (SELECT venues.id,venues.name) sub)) json_venues
    FROM
      venues
  ),
  _clubs AS (
    SELECT
      clubs.id,
      ROW_TO_JSON((SELECT sub FROM (SELECT clubs.id,clubs.name) sub)) json_clubs
    FROM
      clubs
  ),
  _regions AS (
    SELECT
      regions.id,
      ROW_TO_JSON((SELECT sub FROM (SELECT regions.id,regions.name) sub)) json_regions
    FROM
      regions
  )`
const normalSelects = `
  events.id,
  events.name,
  events.start_date,
  events.end_date,
  events.description,
  events.round,
  events.is_fta,
  events.is_ppv,
  _code_types.json_code_types codetype,
  _code_types.json_codes code,
  _venues.json_venues venue,
  _clubs.json_clubs club,
  _regions.json_regions region`
const countSelect = 'COUNT(DISTINCT events.id)'

module.exports = function (conditionsStatement = '', limitStatement = '', orderByStatement = '', isCount = false) {
  const sql = `
    ${withs}
    SELECT
      ${getSelectStatement(isCount)}
    FROM
      events
    LEFT JOIN
      _code_types ON events.code_type_id=_code_types.id
    LEFT JOIN
      _venues ON events.venue_id=_venues.id
    LEFT JOIN
      _clubs ON events.host_club_id=_clubs.id
    LEFT JOIN
      _regions ON events.region_id=_regions.id
    ${conditionsStatement}
    ${isCount ? '' : orderByStatement}
    ${isCount ? '' : limitStatement}`
  return sql
}

function getSelectStatement (isCount) {
  return isCount ? countSelect : normalSelects
}
