'use strict'

const createRepositoryService = require('./repository')
const knex = require('../db')
const brandRepository = createRepositoryService('brands')

const tableName = 'brands'

async function all () {
  const result = await knex.raw(`
    WITH _brand_categories AS (
      SELECT
        brands_brand_categories.brand_id,
        JSON_AGG((SELECT _brand_categories FROM (SELECT brand_categories.id,brand_categories.name) _brand_categories)) brand_categories
      FROM
        brands_brand_categories
      INNER JOIN
        brand_categories ON brands_brand_categories.brand_category_id=brand_categories.id
      GROUP BY
        brands_brand_categories.brand_id
    )
    SELECT
      brands.id,
      brands.name,
      _brand_categories.brand_categories
    FROM
      brands
    LEFT JOIN
      _brand_categories ON brands.id=_brand_categories.brand_id
    ORDER BY
      LOWER(brands.name)`)
  return result.rows
}

const create = async ({ name, email, description }) => {
  const createdBrand = await brandRepository.getConnection()(tableName)
    .insert({ name, email, description })
    .returning('id')
  return brandRepository.findById(createdBrand[0])
}

const update = async (brandID, { name, email, description }) => {
  const updatedBrand = await brandRepository.getConnection()(tableName)
    .where('id', brandID)
    .update({ name, email, description })
    .returning('id')
  return brandRepository.findById(updatedBrand[0])
}

const listItem = (page, itemsPerPage, orderBy) => {
  return brandRepository.getConnection()(tableName)
    .select('id', 'name', 'email', 'description')
    .orderBy(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
}

const list = async (page, itemsPerPage, orderBy) => {
  // Get Total Item in DB
  const totalItem = await countAll()

  // Set Page Offset
  const count = parseInt(totalItem.count)
  const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
  page = page > actualPageCount ? actualPageCount : page

  // Find all item with condition
  const resultListItem = await listItem(page, itemsPerPage, orderBy)

  // Return item as json format
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

const search = async (page, itemsPerPage, brand) => {
  const resultListBuilder = brandRepository.getConnection()(tableName)
  resultListBuilder.select('id', 'name', 'email', 'description')
  resultListBuilder.whereRaw('LOWER(name) LIKE ?', [`%${brand.toLowerCase()}%`])

  const resultListItem = await resultListBuilder
  const totalItem = await brandRepository.getConnection()(tableName)
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

const countAll = () => {
  return brandRepository.getConnection()(tableName)
    .count('id')
    .first()
}

const del = (brandID) => {
  return brandRepository.getConnection()(tableName)
    .where('id', brandID)
    .del()
}

module.exports = {
  ...brandRepository,
  all,
  create,
  update,
  list,
  search,
  del
}
