'use strict'
const debug = require('debug')('qms-tradingdesk-client:api:adminController')
const createRepositoryService = require('./repository')
const assetUnitsRepository = createRepositoryService('asset_units')
module.exports = {
  ...assetUnitsRepository,
  create,
  findById,
  update,
  list,
  del,
  archive,
  restore,
  simpleList
}

function simpleList () {
  return assetUnitsRepository.getConnection()('asset_units')
    .select(['id', 'name', 'duration'])
    .where('archive', 'FALSE')
    .orderByRaw('LOWER(name)')
}

function create (requestJson) {
  const {
    name,
    duration,
    price_fta: priceFta,
    price_ppv: pricePpv,
    price_min: priceMin,
    fee_production: feeProduction,
    fee_installation: feeInstallation,
    links,
    cost
  } = requestJson
  const knex = assetUnitsRepository.getConnection()
  debug('test=>', priceMin)
  return new Promise(function (resolve) {
    knex.transaction(function (trx) {
      let result
      createUnit(trx, name, duration, priceFta, pricePpv, priceMin, feeProduction, feeInstallation, cost)
        .then(insertLinksToUnit(trx, links))
        .then((newAssetUnit) => (result = newAssetUnit))
        .then(trx.commit)
        .then(() => resolve(result))
    })
  })
}

async function archive (id) {
  const updated = await assetUnitsRepository.getConnection()('asset_units')
    .returning('*')
    .where('id', id)
    .update({
      archive: true
    })
  return updated[0]
}

async function restore (id) {
  const updated = await assetUnitsRepository.getConnection()('asset_units')
    .returning('*')
    .where('id', id)
    .update({
      archive: false
    })
  return updated[0]
}

function createUnit (trx, name, duration, priceFta, pricePpv, priceMin, feeProduction, feeInstallation, cost) {
  debug('test=>', priceMin)
  return trx('asset_units')
    .returning('*')
    .insert({
      name,
      duration,
      price_fta: priceFta,
      price_ppv: pricePpv,
      price_min: priceMin,
      fee_production: feeProduction,
      fee_installation: feeInstallation,
      cost
    })
}

function insertLinksToUnit (trx, links) {
  return function ([newAssetUnit]) {
    const insertParameters = links.map((link) => ({
      asset_unit_id: newAssetUnit.id,
      link
    }))
    return new Promise(function (resolve) {
      trx('asset_unit_links')
        .insert(insertParameters)
        .then(() => resolve(newAssetUnit))
    })
  }
}

function findById (id) {
  return new Promise(function (resolve) {
    const connection = assetUnitsRepository.getConnection()
    const conditionsStatement = connection.raw('WHERE asset_units.id=?', [id])
    const sql = createSelectAssetUnitSql(conditionsStatement)
    return connection
      .raw(sql)
      .then(result => resolve(result.rowCount > 0 ? result.rows[0] : null))
  })
}

function update (id, requestJson) {
  const {
    name,
    duration,
    price_fta: priceFta,
    price_ppv: pricePpv,
    price_min: priceMin,
    fee_production: feeProduction,
    fee_installation: feeInstallation,
    links,
    cost
  } = requestJson
  const knex = assetUnitsRepository.getConnection()
  return new Promise(function (resolve) {
    knex.transaction(function (trx) {
      let result
      updateUnit(trx, id, name, duration, priceFta, pricePpv, priceMin, feeProduction, feeInstallation, cost)
        .then(deleteLinksFromUnit(trx, id))
        .then(insertLinksToUnit(trx, links))
        .then((updatedAssetUnit) => (result = updatedAssetUnit))
        .then(trx.commit)
        .then(() => resolve(result))
    })
  })
}

function updateUnit (trx, id, name, duration, priceFta, pricePpv, priceMin, feeProduction, feeInstallation, cost) {
  return trx('asset_units')
    .returning('*')
    .where('id', id)
    .update({
      name,
      duration,
      price_fta: priceFta,
      price_ppv: pricePpv,
      price_min: priceMin,
      fee_production: feeProduction,
      fee_installation: feeInstallation,
      cost
    })
}

function deleteLinksFromUnit (trx, assetUnitId) {
  return (assetUnit) => {
    return new Promise(function (resolve) {
      trx('asset_unit_links')
        .where('asset_unit_id', assetUnitId)
        .delete()
        .then(() => resolve(assetUnit))
    })
  }
}

function list (page, itemsPerPage, orderBy, extraOptions = {}) {
  let count
  let actualPageCount
  return new Promise((resolve, reject) => {
    countAll(extraOptions)
      .then((_countResult) => {
        count = parseInt(_countResult.count)
        actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
        page = page > actualPageCount ? actualPageCount : page
        return all(page, itemsPerPage, orderBy, extraOptions)
      })
      .then((_listResult) => resolve({
        paginate: {
          current: page,
          itemsPerPage,
          last: actualPageCount,
          count
        },
        rows: _listResult.rows
      }))
      .catch(err => reject(err))
  })
}

function all (page, itemsPerPage, orderBy, extraOptions) {
  const { name, archive } = extraOptions
  const connection = assetUnitsRepository.getConnection()
  const orderByStatement = `ORDER BY ${orderBy}`
  const limitStatement = `LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * ${page - 1}`

  let condition = `WHERE asset_units.archive=${archive && archive !== undefined ? archive : 'FALSE'}`
  debug(condition)
  if (name && name !== '') {
    condition += ` AND LOWER(asset_units.name) LIKE LOWER('%${name}%')`
  }
  const sql = createSelectAssetUnitSql(condition, orderByStatement, limitStatement)
  return connection.raw(sql)
}

function countAll (withCondition = {}) {
  const connection = assetUnitsRepository.getConnection()('asset_units')
  if (withCondition !== '') {
    return connection
      .where('is_deleted', false)
      .where('archive', withCondition.archive)
      .whereRaw(`LOWER(asset_units.name) LIKE LOWER('%${withCondition.name}%')`)
      .count('id')
      .first()
  }
  return connection
    .where('is_deleted', false)
    .count('id')
    .first()
}

function createSelectAssetUnitSql (conditionsStatement = '', orderByStatement = '', limitStatement = '') {
  return `
    WITH asset_unit_links AS (
      SELECT
        asset_unit_id,
        ARRAY_AGG(link) links
      FROM
        asset_unit_links
      WHERE
        TRIM(COALESCE(link, '')) <> ''
      GROUP BY
        asset_unit_id
    )
    SELECT
      asset_units.id,
      asset_units.name,
      asset_units.duration,
      asset_units.price_fta,
      asset_units.price_ppv,
      asset_units.price_min,
      asset_units.fee_production,
      asset_units.fee_installation,
      asset_units.cost,
      ARRAY_TO_JSON(COALESCE(asset_unit_links.links, '{}')) links
    FROM
      (SELECT * FROM asset_units WHERE is_deleted=FALSE) asset_units
    LEFT JOIN
      asset_unit_links ON asset_unit_links.asset_unit_id=asset_units.id
    ${conditionsStatement}
    ${orderByStatement}
    ${limitStatement}`
}

function del (id) {
  return assetUnitsRepository.getConnection()('asset_units')
    .where('id', id)
    .update({ is_deleted: true })
}
