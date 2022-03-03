'use strict'
const { assetsOrderByColumns } = require('../../config').static
const createRepositoryService = require('../repository')
const assetRepository = createRepositoryService('assets')
const createSelectAssetsSql = require('./createSelectAssetsSql')
const { createConditionStatement } = require('./functions')

module.exports = list

async function _count (conditions, assetRepository) {
  const conditionStatement = createConditionStatement(conditions, assetRepository)
  const sql = createSelectAssetsSql(conditionStatement, '', '', true)
  const rawResult = await assetRepository.getConnection().raw(sql)
  return rawResult.rows[0].count
}

async function all (page, itemsPerPage, orderBy, conditions, assetRepository) {
  const limitStatement = assetRepository.createLimitStatement(page, itemsPerPage)
  const orderByStatement = `ORDER BY ${assetsOrderByColumns[orderBy]}`
  const conditionStatement = createConditionStatement(conditions, assetRepository)
  const sql = createSelectAssetsSql(conditionStatement, limitStatement, orderByStatement)
  const rawResult = await assetRepository.getConnection().raw(sql)
  return rawResult.rows
}

async function list (page, itemsPerPage, orderBy, conditions) {
  const count = parseInt(await _count(conditions, assetRepository))
  const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
  page = page > actualPageCount ? actualPageCount : page
  const listItem = await all(page, itemsPerPage, orderBy, conditions, assetRepository)
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
