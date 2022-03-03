'use strict'

const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/assets' })
const assetController = require('../controllers/assets')

module.exports = () => {
  router.post('/search', assetController.search)

  return router
}
