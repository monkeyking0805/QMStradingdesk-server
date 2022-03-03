'use strict'

const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/assetunits' })
const assetUnitsController = require('../../controllers/admin/assetUnits')
const createValidator = require('../../validators/assetUnits/create')
const viewValidator = require('../../validators/assetUnits/view')
const updateValidator = require('../../validators/assetUnits/update')
const listValidator = require('../../validators/assetUnits/list')
const deleteValidator = require('../../validators/assetUnits/delete')

module.exports = () => {
  router.post('/', createValidator.validate, assetUnitsController.create)
  router.get('/:id', viewValidator.validate, assetUnitsController.view)
  router.put('/:id', updateValidator.validate, assetUnitsController.update)
  router.get('/', listValidator.validate, assetUnitsController.list)
  router.post('/archive', assetUnitsController.archive)
  router.post('/restore', assetUnitsController.restore)
  router.del('/:id', deleteValidator.validate, assetUnitsController.del)

  return router
}
