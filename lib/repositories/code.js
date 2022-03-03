'use strict'
const debug = require('debug')('qms-tradingdesk-server:repositories:code')
const createRepositoryService = require('./repository')
const codesRepository = createRepositoryService('codes')

const create = ({ name }) => {
  debug(create.name)
  return codesRepository.getConnection()('codes')
    .insert({ name })
    .returning('id')
}

const update = (codeID, { name }) => {
  debug(update.name)
  return codesRepository.getConnection()('codes')
    .where('id', codeID)
    .update({ name })
    .returning('*')
}

const list = async (page, itemsPerPage, orderBy) => {
  debug(list.name)
  // Get Total Item in DB
  const totalItem = await countAll()

  // Set Page Offset
  const count = parseInt(totalItem.count)
  const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
  page = page > actualPageCount ? actualPageCount : page

  // Find all item with condition
  const listItem = await all(page, itemsPerPage, orderBy)

  // Return result in paginate status and datas
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

const all = (page, itemsPerPage, orderBy) => {
  debug(all.name)
  return codesRepository.getConnection()('codes')
    .select('id', 'name')
    .orderBy(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
}

const countAll = () => {
  debug(countAll.name)
  const connection = codesRepository.getConnection()('codes')
  return connection
    .count('id')
    .first()
}

const del = (codeID) => {
  debug(del.name)
  return codesRepository.getConnection()('codes')
    .where('id', codeID)
    .del()
}

module.exports = {
  ...codesRepository,
  create,
  update,
  list,
  del
}
