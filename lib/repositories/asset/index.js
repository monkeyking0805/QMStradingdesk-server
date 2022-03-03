'use strict'

const createRepositoryService = require('../repository')
const assetRepository = createRepositoryService('assets')
const createSelectAssetsSql = require('./createSelectAssetsSql')
const {
  createConditionStatement
} = require('./functions')

module.exports = {
  ...assetRepository,
  search: require('./search'),
  list: require('./list'),
  findById,
  findByEventId,
  findByAssetUnitId,
  getAvailableSlots,
  create,
  update,
  archive,
  restore,
  del
}

/**
 * Get available slots for assets
 * @param assetIds An array of asset id, can be null or empty array
 * @param packageId A package id to be excluded from calculation
 */
function getAvailableSlots (assetIds = null, packageId = null) {
  const knex = assetRepository.getConnection()
  let assetIdsCriteria = ''
  let packageIdCriteria = ''
  if (Array.isArray(assetIds) && assetIds.length > 0) {
    assetIdsCriteria = knex.raw('WHERE assets.id=ANY(?)', [assetIds])
  }
  if (packageId) {
    packageIdCriteria = knex.raw('AND packages_assets.package_id<>?', [packageId])
  }
  const sql = `
    WITH package_assets AS (SELECT
      packages_assets.asset_id,
      SUM(packages_assets.slots) unavailable_slots
    FROM
      packages_assets
    INNER JOIN
      packages ON packages.id=packages_assets.package_id
    INNER JOIN
      package_statuses ON package_statuses.id=packages.package_status_id
    WHERE
      package_statuses.name='approved'
      ${packageIdCriteria}
    GROUP BY
      packages_assets.asset_id
    )
    SELECT
      assets.id,
      (assets.slots-COALESCE(package_assets.unavailable_slots, 0))::int available_slots
    FROM
      assets
    LEFT JOIN
      package_assets ON package_assets.asset_id=assets.id
    ${assetIdsCriteria}`
  return knex.raw(sql)
}

async function findById (id) {
  const sql = createSelectAssetsSql(createConditionStatement({ assetId: id }, assetRepository))
  const resultRaw = await assetRepository.getConnection().raw(sql)
  return resultRaw.rows[0]
}

async function findByEventId (id) {
  const sql = `SELECT assets.id FROM assets WHERE assets.event_id=${id} AND assets.archive=FALSE`
  const resultRaw = await assetRepository.getConnection().raw(sql)
  return resultRaw.rows
}

async function findByAssetUnitId (id) {
  const sql = `SELECT assets.id FROM assets WHERE assets.asset_unit_id=${id} AND assets.archive=FALSE`
  const resultRaw = await assetRepository.getConnection().raw(sql)
  return resultRaw.rows
}

async function archive (id) {
  const updated = await assetRepository.getConnection()('assets')
    .returning('*')
    .where('id', id)
    .update({
      archive: true
    })
  return updated[0]
}

async function restore (id) {
  const updated = await assetRepository.getConnection()('assets')
    .returning('*')
    .where('id', id)
    .update({
      archive: false
    })
  return updated[0]
}

async function create (requestJson) {
  const inserted = await assetRepository.getConnection()('assets')
    .returning('*')
    .insert({
      event_id: requestJson.event,
      asset_type_id: requestJson.assetType,
      asset_unit_id: requestJson.assetUnit,
      slots: requestJson.slots
    })
  return inserted[0]
}

async function update (id, requestJson) {
  const updated = await assetRepository.getConnection()('assets')
    .returning('*')
    .where('id', id)
    .update({
      event_id: requestJson.event,
      asset_type_id: requestJson.assetType,
      asset_unit_id: requestJson.assetUnit,
      slots: requestJson.slots
    })
  return updated[0]
}

async function del (id) {
  await assetRepository.getConnection()('assets')
    .where('id', id)
    .del()
}
