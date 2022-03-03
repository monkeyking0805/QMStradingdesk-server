'use strict'

const createRepositoryService = require('./repository')
const venueRepository = createRepositoryService('venues')

const create = ({ name }) => {
  return venueRepository.getConnection()('venues')
    .insert({ name })
    .returning('id')
}

const update = (venueID, { name }) => {
  return venueRepository.getConnection()('venues')
    .where('id', venueID)
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
  return venueRepository.getConnection()('venues')
    .select('id', 'name')
    .orderBy(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
}

const countAll = () => {
  const connection = venueRepository.getConnection()('venues')
  return connection
    .count('id')
    .first()
}

const del = (venueID) => {
  return venueRepository.getConnection()('venues')
    .where('id', venueID)
    .del()
}

module.exports = {
  ...venueRepository,
  create,
  update,
  list,
  del
}
