'use strict'

const router = require('koa-router')()
const brandCategoryController = require('../controllers/masterData/brandCategories')

module.exports = () => {
  router.get('/brand_categories', brandCategoryController.list)

  return router
}
