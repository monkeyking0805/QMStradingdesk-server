'use strict'

const createRepositoryService = require('../repository')
const _ = require('lodash')
const eventRepository = createRepositoryService('events')
const createSelectEventsSql = require('./createSelectEventsSql')
const { static: { eventsOrderByColumns } } = require('../../config')
const {
  createConditionStatement
} = require('./functions')

module.exports = {
  ...eventRepository,
  all,
  list,
  archive,
  restore,
  findById,
  create,
  update,
  del
}

function all () {
  return eventRepository.getConnection()('events')
    .where('is_deleted', false)
    .where('archive', false)
    .select(['id', 'name'])
    .orderByRaw('LOWER(name)')
}

async function findById (id) {
  const conditionStatement = createConditionStatement({ event: id })
  const sql = createSelectEventsSql(conditionStatement)
  const rawResult = await eventRepository.getConnection().raw(sql)
  return rawResult.rows[0]
}

async function _count (conditions, assetRepository) {
  const conditionStatement = createConditionStatement(conditions)
  const sql = createSelectEventsSql(conditionStatement, '', '', true)
  const rawResult = await assetRepository.getConnection().raw(sql)
  return rawResult.rows[0].count
}

async function _list (page, itemsPerPage, orderBy, conditions) {
  const limitStatement = eventRepository.createLimitStatement(page, itemsPerPage)
  const orderByStatement = `ORDER BY ${eventsOrderByColumns[orderBy]}`
  const conditionStatement = createConditionStatement(conditions, eventRepository)
  const sql = createSelectEventsSql(conditionStatement, limitStatement, orderByStatement)
  const rawResult = await eventRepository.getConnection().raw(sql)
  return rawResult.rows
}

async function list (params) {
  const { conditions, paging: { page, itemsPerPage }, orderBy } = params
  const count = parseInt(await _count(conditions, eventRepository))
  const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
  const _page = page > actualPageCount ? actualPageCount : page
  const listItem = await _list(_page, itemsPerPage, orderBy, conditions, eventRepository)
  return {
    paginate: {
      current: _page,
      itemsPerPage: itemsPerPage,
      last: actualPageCount,
      count
    },
    rows: listItem
  }
}

async function archive (id) {
  const updated = await eventRepository.getConnection()('events')
    .returning('*')
    .where('id', id)
    .update({ archive: true })
  return updated[0]
}

async function restore (id) {
  const updated = await eventRepository.getConnection()('events')
    .returning('*')
    .where('id', id)
    .update({
      archive: false
    })
  return updated[0]
}

async function create (requestJson) {
  const created = await eventRepository.getConnection()('events')
    .returning('*')
    .insert(_.pickBy({
      name: requestJson.name,
      description: requestJson.description,
      code_type_id: requestJson.codeType,
      venue_id: requestJson.venue,
      host_club_id: requestJson.club,
      region_id: requestJson.region,
      start_date: requestJson.startDate,
      end_date: requestJson.endDate,
      is_fta: requestJson.isFta,
      is_ppv: requestJson.isPpv,
      round: requestJson.round
    }))
  return Array.isArray(created) ? created[0] : created
}

async function update (id, requestJson) {
  const updated = await eventRepository.getConnection()('events')
    .returning('*')
    .where('id', id)
    .andWhere('is_deleted', false)
    .update({
      name: requestJson.name,
      description: requestJson.description,
      code_type_id: requestJson.codeType,
      venue_id: requestJson.venue,
      host_club_id: requestJson.club,
      region_id: requestJson.region,
      start_date: requestJson.startDate,
      end_date: requestJson.endDate,
      is_fta: requestJson.isFta,
      is_ppv: requestJson.isPpv,
      round: requestJson.round
    })
  return Array.isArray(updated) ? updated[0] : updated
}

async function del (id) {
  return eventRepository.getConnection()('events')
    .where('id', id)
    .update({ is_deleted: true })
}
