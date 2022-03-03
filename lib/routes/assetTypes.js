'use strict'

const router = require('koa-router')()
const assetTypesController = require('../controllers/masterData/assetTypes')

module.exports = () => {
  router.get('/assettypes', assetTypesController.list)

  return router
}
