'use strict'

module.exports = {
  createConditionStatement
}

function isNotEmptyArray (value) {
  return Array.isArray(value) && (value.length > 0)
}

function createConditionStatement (conditions, assetRepository) {
  const connection = assetRepository.getConnection()
  const _conditions = []
  if (conditions) {
    if (conditions.assetId) {
      _conditions.unshift({
        statement: 'assets.id=?',
        params: [conditions.assetId]
      })
    }
    if (conditions.name && conditions.name.length !== 0) {
      _conditions.unshift({
        statement: 'LOWER(asset_units.name) LIKE ?',
        params: ['%' + conditions.name.toLowerCase() + '%']
      })
    }
    if (conditions.archive) {
      _conditions.unshift({
        statement: 'assets.archive=?',
        params: [conditions.archive]
      })
    }
    if (isNotEmptyArray(conditions.codes)) {
      _conditions.unshift({
        statement: 'codes.id=ANY(?)',
        params: [conditions.codes]
      })
    }
    if (isNotEmptyArray(conditions.events)) {
      _conditions.unshift({
        statement: 'events.id=ANY(?)',
        params: [conditions.events]
      })
    }
    if (isNotEmptyArray(conditions.assetTypes)) {
      _conditions.unshift({
        statement: 'asset_types.id=ANY(?)',
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
