'use strict'

const createRepositoryService = require('../repository')
const exclusionRepository = createRepositoryService('exclusions')
const createSelectExclusionSql = require('./createSelectExclusionSql')

module.exports = {
  all,
  countAll,
  createConditionStatement,
  createSelectExclusionSql,
  deleteRelatedExclusions,
  insertRelatedExclusions
}

function all (conditions, page, itemsPerPage) {
  const connection = exclusionRepository.getConnection()
  const conditionsStatement = createConditionStatement(conditions)
  connection.raw(conditionsStatement)
  const limitStatement = exclusionRepository.createLimitStatement(page, itemsPerPage)
  const sql = createSelectExclusionSql(conditionsStatement, limitStatement)
  return connection.raw(sql)
}

function countAll (conditions) {
  const connection = exclusionRepository.getConnection()
  const conditionsStatement = createConditionStatement(conditions)
  const sql = createSelectExclusionSql(conditionsStatement, '', true)
  return new Promise(function (resolve) {
    connection
      .raw(sql)
      .then((result) => resolve(result.rows[0]))
  })
}

function isNotEmptyArray (value) {
  return Array.isArray(value) && (value.length > 0)
}

function createConditionStatement (conditions) {
  const connection = exclusionRepository.getConnection()
  const _conditions = []
  if (conditions) {
    if (conditions.exclusion) {
      _conditions.unshift({
        statement: 'exclusions.id=?',
        params: [conditions.exclusion]
      })
    }
    if (isNotEmptyArray(conditions.brandCategories)) {
      _conditions.unshift({
        statement: 'exclusions.id IN (SELECT exclusion_id FROM public.exclusions_brand_categories WHERE brand_category_id=ANY(?))',
        params: [conditions.brandCategories]
      })
    }
    if (isNotEmptyArray(conditions.brands)) {
      _conditions.unshift({
        statement: 'exclusions.id IN (SELECT exclusion_id FROM public.exclusions_brands WHERE brand_id=ANY(?))',
        params: [conditions.brands]
      })
    }
    if (isNotEmptyArray(conditions.codeTypes)) {
      _conditions.unshift({
        statement: 'exclusions.id IN (SELECT exclusion_id FROM public.exclusions_code_types WHERE code_type_id=ANY(?))',
        params: [conditions.codeTypes]
      })
    }
    if (isNotEmptyArray(conditions.codes)) {
      _conditions.unshift({
        statement:
          `exclusions.id IN
            (SELECT
              exclusion_id 
            FROM
              public.exclusions_code_types 
            INNER JOIN
              public.code_types ON public.exclusions_code_types.code_type_id=public.code_types.id 
            WHERE
              public.code_types.code_id=ANY(?))`,
        params: [conditions.codes]
      })
    }
    if (isNotEmptyArray(conditions.clubs)) {
      _conditions.unshift({
        statement: 'exclusions.id IN (SELECT exclusion_id FROM public.exclusions_clubs WHERE club_id=ANY(?))',
        params: [conditions.clubs]
      })
    }
    if (isNotEmptyArray(conditions.venues)) {
      _conditions.unshift({
        statement: 'exclusions.id IN (SELECT exclusion_id FROM public.exclusions_venues WHERE venue_id=ANY(?))',
        params: [conditions.venues]
      })
    }
    if (isNotEmptyArray(conditions.assetTypes)) {
      _conditions.unshift({
        statement: 'exclusions.id IN (SELECT exclusion_id FROM public.exclusions_asset_types WHERE asset_type_id=ANY(?))',
        params: [conditions.assetTypes]
      })
    }
    const statements = _conditions.map((condition) => {
      return connection.raw(condition.statement, condition.params).toString()
    })
    return statements.length === 0 ? '' : `WHERE ${statements.join(' AND ')}`
  }
  return ''
}

function deleteRelatedExclusions (exclusionId, trx) {
  const tables = ['brand_categories', 'brands', 'clubs', 'code_types', 'venues', 'asset_types']
  const deleteStatements = tables.map((table) => trx(`exclusions_${table}`).where('exclusion_id', exclusionId).del())
  return Promise.all(deleteStatements)
}

function insertRelatedExclusions (exclusionId, requestJson, trx) {
  const insertPromises = []
  const params = [
    { propName: 'brandCategories', table: 'exclusions_brand_categories', fieldName: 'brand_category_id' },
    { propName: 'brands', table: 'exclusions_brands', fieldName: 'brand_id' },
    { propName: 'clubs', table: 'exclusions_clubs', fieldName: 'club_id' },
    { propName: 'codeTypes', table: 'exclusions_code_types', fieldName: 'code_type_id' },
    { propName: 'venues', table: 'exclusions_venues', fieldName: 'venue_id' },
    { propName: 'assetTypes', table: 'exclusions_asset_types', fieldName: 'asset_type_id' }
  ]
  params.forEach((param) => {
    requestJson[param.propName].forEach((id) => {
      const insertParameters = { exclusion_id: exclusionId }
      insertParameters[param.fieldName] = id
      insertPromises.push(trx(param.table).insert(insertParameters))
    })
  })
  return Promise.all(insertPromises)
}
