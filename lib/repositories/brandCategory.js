'use strict'
const debug = require('debug')('qms-tradingdesk-server:repositories:brandCategory')
const createRepositoryService = require('./repository')
const knex = require('../db')
const brandCategoryRepository = createRepositoryService('brand_categories')

brandCategoryRepository.all = async function () {
  debug(this.all.name)
  return knex.raw(`
    SELECT
      brand_categories.id,
      brand_categories.name "name",
      brand_categories.parent_brand_category_id,
      parent.name parent_name,
      brand_categories.created_at,
      brand_categories.updated_at
    FROM
      brand_categories parent
    RIGHT OUTER JOIN 
      brand_categories brand_categories ON parent.id = brand_categories.parent_brand_category_id
    ORDER BY
      COALESCE(parent.name, brand_categories.name)`)
}

const create = ({ name }) => {
  debug(create.name)
  return brandCategoryRepository.getConnection()('brand_categories')
    .insert({ name })
    .returning('id')
}

const update = (brandCategoryID, { name }) => {
  debug(update.name)
  return brandCategoryRepository.getConnection()('brand_categories')
    .where('id', brandCategoryID)
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

const search = async (page, itemsPerPage, brand) => {
  const resultListBuilder = brandCategoryRepository.getConnection()('brand_categories')
  resultListBuilder.select('id', 'name')
  resultListBuilder.whereRaw('LOWER(name) LIKE ?', [`%${brand.toLowerCase()}%`])

  const resultListItem = await resultListBuilder
  const totalItem = await brandCategoryRepository.getConnection()('brand_categories')
    .whereRaw('LOWER(name) LIKE ?', [`%${brand.toLowerCase()}%`])
    .count('id')
    .first()

  const count = parseInt(totalItem.count)
  const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
  page = page > actualPageCount ? actualPageCount : page

  return {
    paginate: {
      current: page,
      itemsPerPage,
      last: actualPageCount,
      count
    },
    rows: resultListItem
  }
}

const adminList = (page, itemsPerPage, orderBy) => {
  debug(adminList.name)
  return brandCategoryRepository.getConnection()('brand_categories')
    .select('id', 'name')
    .orderBy(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
}

const countAll = () => {
  debug(countAll.name)
  const connection = brandCategoryRepository.getConnection()('brand_categories')
  return connection
    .count('id')
    .first()
}

const del = (brandCategoryID) => {
  debug(del.name)
  return brandCategoryRepository.getConnection()('brand_categories')
    .where('id', brandCategoryID)
    .del()
}

module.exports = {
  ...brandCategoryRepository,
  create,
  update,
  list,
  search,
  del
}
