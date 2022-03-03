'use strict'

const router = require('koa-router')()
const viewValidator = require('../validators/assetUnits/view')
const assetUnitsController = require('../controllers/masterData/assetUnits')

module.exports = () => {
  router.get('/assetunits', assetUnitsController.list)
  router.get('/assetunits/:id', viewValidator.validate, assetUnitsController.view)

  return router
}
