'use strict'

const createRepositoryService = require('./repository')
const codeTypeRepository = createRepositoryService('code_types')

const tableName = 'code_types'

function all () {
  return codeTypeRepository.getConnection()('code_types')
    .select(['id', 'name'])
    .orderByRaw('LOWER(name)')
}

const countAll = () => {
  const connection = codeTypeRepository.getConnection()(tableName)
  return connection
    .count('id')
    .first()
}

const list = async (page, itemsPerPage, orderBy) => {
  // Get Total Item in DB
  const totalItem = await countAll()

  // Set Page Offset
  const count = parseInt(totalItem.count)
  const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
  page = page > actualPageCount ? actualPageCount : page

  // Find all item with condition
  const listItem = await _codeTypeList(page, itemsPerPage, orderBy)

  // Return item as json format
  return {
    paginate: {
      current: page,
      itemsPerPage,
      last: actualPageCount,
      count
    },
    rows: listItem.rows
  }
}

const create = ({ name, code }) => {
  return codeTypeRepository.getConnection()(tableName)
    .insert({
      name,
      code_id: code
    })
    .returning('id')
}

const update = (codeTypeID, { name, code }) => {
  return codeTypeRepository.getConnection()(tableName)
    .where('id', codeTypeID)
    .update({
      name,
      code_id: code
    })
    .returning('*')
}

const _codeTypeList = (page, itemsPerPage, orderBy) => {
  // Generate Query to select Code Typs with join with codes as json format
  const query = codeTypeRepository.getConnection()
    // Select id, name and code as json format
    .select(
      'code_types.id',
      'code_types.name',
      'ROW_TO_JSON((SELECT sub FROM (SELECT codes.id,codes.name) sub)) code'
    )
    .from(tableName)
    // Join with codes table
    .innerJoin('codes', 'code_types.code_id', 'codes.id')
    .orderBy(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
    .toString()
    .replace(/['"]+/g, '')

  return codeTypeRepository.getConnection().raw(query)
}

const del = (codeTypeID) => {
  return codeTypeRepository.getConnection()(tableName)
    .where('id', codeTypeID)
    .del()
}

// Overide FindById function
const findById = async (codeTypeID) => {
  const query = codeTypeRepository.getConnection()
  // Select id, name and code as json format
    .select(
      'code_types.id',
      'code_types.name',
      'ROW_TO_JSON((SELECT sub FROM (SELECT codes.id,codes.name) sub)) code'
    )
    .from(tableName)
    // Join with codes table
    .innerJoin('codes', 'code_types.code_id', 'codes.id')
    .where('code_types.id', codeTypeID)
    .toString()
    .replace(/['"]+/g, '')

  const result = await codeTypeRepository.getConnection().raw(query)
  if (result.rows[0]) {
    return result.rows[0]
  }
  return null
}

module.exports = {
  ...codeTypeRepository,
  all,
  create,
  update,
  list,
  del,
  findById
}
