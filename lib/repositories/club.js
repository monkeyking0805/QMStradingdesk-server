'use strict'

const createRepositoryService = require('./repository')
const clubRepository = createRepositoryService('clubs')
const { error: { sql: { db: dbError } } } = require('../config')
const tableName = 'clubs'

function getExclusions (clubId) {
  const sql = `
  WITH
  selected_events AS (
    SELECT host_club_id,code_type_id,venue_id FROM events WHERE host_club_id=?
  ),
  interested_exclusions AS (
    (
      (SELECT exclusion_id FROM exclusions_clubs WHERE exclusions_clubs.club_id IN (SELECT host_club_id FROM selected_events))
      UNION
      (SELECT exclusion_id FROM exclusions_code_types WHERE exclusions_code_types.code_type_id IN (SELECT code_type_id FROM selected_events))
      UNION
      (SELECT exclusion_id FROM exclusions_venues WHERE exclusions_venues.venue_id IN (SELECT venue_id FROM selected_events))
    )
    EXCEPT
    (
      (
        SELECT exclusion_id FROM exclusions_clubs 
        WHERE exclusions_clubs.club_id NOT IN (
          SELECT host_club_id FROM (SELECT host_club_id from selected_events) as club_include
        ) 
        AND exclusion_id NOT IN (
          (
            SELECT exclusion_id FROM exclusions_clubs WHERE exclusions_clubs.club_id IN (
              SELECT host_club_id FROM (SELECT host_club_id from selected_events) as club_exclude
            )
          )
        )
      )
      UNION
      (
        SELECT exclusion_id FROM exclusions_code_types 
        WHERE exclusions_code_types.code_type_id NOT IN (
          SELECT code_type_id FROM (SELECT code_type_id from selected_events) as code_types_include
        )
        AND exclusion_id NOT IN (
          (
            SELECT exclusion_id FROM exclusions_code_types WHERE exclusions_code_types.code_type_id IN (
              SELECT code_type_id FROM (SELECT code_type_id from selected_events) as code_types_exclude
            )
          )
        )
      )
      UNION
      (
        SELECT exclusion_id FROM exclusions_venues 
        WHERE exclusions_venues.venue_id NOT IN (
          SELECT venue_id FROM (SELECT venue_id from selected_events) as venue_include
        )
        AND exclusion_id NOT IN (
          (
            SELECT exclusion_id FROM exclusions_venues WHERE exclusions_venues.venue_id IN (
              SELECT venue_id FROM (SELECT venue_id from selected_events) as venue_exclude
            )
          )
        )
      )
    )
  ),
  _exclusions_brand_categories AS (
    SELECT
      e.exclusion_id,
      brand_categories.name
    FROM
      exclusions_brand_categories e
    INNER JOIN
      brand_categories ON e.brand_category_id=brand_categories.id
  ),
  _exclusions_brands AS (
    SELECT
      e.exclusion_id,
      brands.name
    FROM
      exclusions_brands e
    INNER JOIN
      brands ON e.brand_id=brands.id
  )
  SELECT 
    exclusions.id,
    _exclusions_brand_categories.name brand_category_name,
    _exclusions_brands.name brand_name,
    exclusions.note
  FROM
    exclusions
  LEFT JOIN
    _exclusions_brands ON exclusions.id=_exclusions_brands.exclusion_id
  LEFT JOIN
    _exclusions_brand_categories ON exclusions.id=_exclusions_brand_categories.exclusion_id
  WHERE
    exclusions.id IN (SELECT exclusion_id FROM interested_exclusions)
  ORDER BY
    LOWER(_exclusions_brand_categories.name),LOWER(_exclusions_brands.name)`
  return new Promise(function (resolve, reject) {
    clubRepository.getConnection().raw(sql, [clubId])
      .then((result) => resolve(result.rows))
      .catch((err) => {
        if (err.hasOwnProperty('code') && err.hasOwnProperty('table')) {
          const error = new Error(dbError)
          error.status = 500
          error.message = dbError
          error.inner = err
          reject(error)
        } else {
          reject(err)
        }
      })
  })
}

const create = ({ name }) => {
  return clubRepository.getConnection()(tableName)
    .insert({ name })
    .returning('id')
}

const update = (codeID, { name }) => {
  return clubRepository.getConnection()(tableName)
    .where('id', codeID)
    .update({ name })
    .returning('*')
}

const countAll = () => {
  return clubRepository.getConnection()(tableName)
    .count('id')
    .first()
}

const all = (page, itemsPerPage, orderBy) => {
  return clubRepository.getConnection()(tableName)
    .select('id', 'name')
    .orderBy(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
}

const list = async (page, itemsPerPage, orderBy) => {
  // Get Total Item in DB
  const totalItem = await countAll()

  // Set Page Offset
  const count = parseInt(totalItem.count)
  const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
  page = page > actualPageCount ? actualPageCount : page

  // Find all item with condition
  const listItem = await all(page, itemsPerPage, orderBy)

  // Return item
  return {
    paginate: {
      current: page,
      itemsPerPage,
      last: actualPageCount,
      count
    },
    rows: listItem
  }
}

const del = (clubID) => {
  return clubRepository.getConnection()(tableName)
    .where('id', clubID)
    .del()
}

module.exports = {
  ...clubRepository,
  getExclusions,
  countAll,
  list,
  create,
  update,
  del
}
