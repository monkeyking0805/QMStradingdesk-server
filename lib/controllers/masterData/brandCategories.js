'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:brandCategories')
const error = require('debug')('qms-tradingdesk-server:controllers:brandCategories:error')
const httpStatuses = require('../../config').http
const brandCategoryRepository = require('../../repositories/brandCategory')
const { removeTimestamps } = require('../../helpers/transformer')
const { setCache, getCache } = require('../../helpers/redis')
const { cacheName } = require('../../config/cacheName')
module.exports = {
  list
}

async function list (ctx) {
  debug(list.name)
  try {
    let brandCategoriesList
    const getBrandCategoriesCache = await getCache(cacheName.brandCategories.list)
    if (getBrandCategoriesCache === null) {
      const rawBrandCategories = await brandCategoryRepository.all()
      const brandCategories = rawBrandCategories.rows.map((cat) => {
        cat.display_name = cat.parent_brand_category_id ? `${cat.parent_name} - ${cat.name}` : cat.name
        cat.name = cat.display_name
        return cat
      })
      brandCategoriesList = brandCategories
      setCache(cacheName.brandCategories.list, JSON.stringify(brandCategories))
    } else {
      brandCategoriesList = JSON.parse(getBrandCategoriesCache)
    }
    ctx.status = httpStatuses.successful.ok
    ctx.body = removeTimestamps(brandCategoriesList)
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}
