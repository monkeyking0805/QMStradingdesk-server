'use strict'

const createRepositoryService = require('./repository')
const assetTypesRepository = createRepositoryService('asset_types')

const create = ({ name }) => {
  return assetTypesRepository.getConnection()('asset_types')
    .insert({ name })
    .returning('id')
}

const update = (assetTypeID, { name }) => {
  return assetTypesRepository.getConnection()('asset_types')
    .where('id', assetTypeID)
    .update({ name })
    .returning('*')
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

  // Resutn item as json format
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
  return assetTypesRepository.getConnection()('asset_types')
    .select('id', 'name')
    .orderBy(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
}

const countAll = () => {
  const connection = assetTypesRepository.getConnection()('asset_types')
  return connection
    .count('id')
    .first()
}

const del = (assetTypeID) => {
  return assetTypesRepository.getConnection()('asset_types')
    .where('id', assetTypeID)
    .del()
}

module.exports = {
  ...assetTypesRepository,
  create,
  update,
  list,
  del
}
