'use strict'

const createRepositoryService = require('./repository')
const appRepository = createRepositoryService('third_party_apps')
const bcrypt = require('bcryptjs')
const create = ({ name }) => {
  return appRepository.getConnection()('third_party_apps')
    .insert({
      name,
      api_keys: bcrypt.genSaltSync()
    })
    .returning('id')
}

const update = (thirdPartyAppID, { name, api_keys: apiKeys }) => {
  return appRepository.getConnection()('third_party_apps')
    .where('id', thirdPartyAppID)
    .update({ name, api_keys: apiKeys })
    .returning('*')
}

const findByKey = (authorizeKey) => {
  return appRepository.getConnection()('third_party_apps')
    .select('id', 'name', 'api_keys')
    .where({ api_keys: authorizeKey })
}

const list = async (page, itemsPerPage, orderBy) => {
  // Get Total Item in DB
  const totalItem = await countAll()

  // Set Page Offset
  const count = parseInt(totalItem.count)
  const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
  page = page > actualPageCount ? actualPageCount : page

  // Find all item with condition
  const listItem = await adminList(page, itemsPerPage, orderBy)

  // Return item as json format
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

const adminList = (page, itemsPerPage, orderBy) => {
  return appRepository.getConnection()('third_party_apps')
    .select('id', 'name', 'api_keys')
    .orderBy(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
}

const countAll = () => {
  const connection = appRepository.getConnection()('third_party_apps')
  return connection
    .count('id')
    .first()
}

const del = (thirdPartyAppID) => {
  return appRepository.getConnection()('third_party_apps')
    .where('id', thirdPartyAppID)
    .del()
}

module.exports = {
  ...appRepository,
  findByKey,
  create,
  update,
  list,
  del
}
