'use strict'

const createRepositoryService = require('../repository')
const eventsRepository = createRepositoryService('events')

module.exports = {
  createConditionStatement
}

function isNotEmptyArray (value) {
  return Array.isArray(value) && (value.length > 0)
}

function createConditionStatement (conditions) {
  const connection = eventsRepository.getConnection()
  const _conditions = []
  _conditions.unshift({
    statement: 'is_deleted=?',
    params: [false]
  })
  if (conditions) {
    if (conditions.event) {
      _conditions.unshift({
        statement: 'events.id=?',
        params: [conditions.event]
      })
    } else {
      if (conditions.name) {
        _conditions.unshift({
          statement: 'LOWER(events.name) LIKE ?',
          params: ['%' + conditions.name.toLowerCase() + '%']
        })
      }
      if (conditions.archive) {
        _conditions.unshift({
          statement: 'events.archive=?',
          params: [conditions.archive]
        })
      }
      if (isNotEmptyArray(conditions.codes)) {
        _conditions.unshift({
          statement: '_code_types.id=ANY(?)',
          params: [conditions.codes]
        })
      }
      if (isNotEmptyArray(conditions.venues)) {
        _conditions.unshift({
          statement: '_venues.id=ANY(?)',
          params: [conditions.venues]
        })
      }
      if (isNotEmptyArray(conditions.clubs)) {
        _conditions.unshift({
          statement: '_clubs.id=ANY(?)',
          params: [conditions.clubs]
        })
      }
      if (isNotEmptyArray(conditions.regions)) {
        _conditions.unshift({
          statement: '_regions.id=ANY(?)',
          params: [conditions.regions]
        })
      }
      if (conditions.startDate) {
        _conditions.unshift({
          statement: 'events.start_date >= ?',
          params: [conditions.startDate]
        })
      }
      if (conditions.endDate) {
        _conditions.unshift({
          statement: 'events.end_date <= ?',
          params: [conditions.endDate]
        })
      }
    }
    const statements = _conditions.map((condition) => {
      return connection.raw(condition.statement, condition.params).toString()
    })
    return statements.length === 0 ? '' : `WHERE ${statements.join(' AND ')}`
  }
  return ''
}
