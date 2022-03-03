'use strict'

const router = require('koa-router')()
const packageListValidator = require('../validators/packages/list')
const packageSaveValidator = require('../validators/packages/save')
const packageViewValidator = require('../validators/packages/view')
const packageUpdateValidator = require('../validators/packages/update')
const packageConfirmValidator = require('../validators/packages/confirm')
const packageController = require('../controllers/packages')
const { packages: packageRouteNames } = require('../config').static.routeNames

module.exports = () => {
  router.get('/packages', packageListValidator.validate, packageController.list)
  router.get('/packages/:id', packageViewValidator.validate, packageController.view)
  router.put('/packages/:id/confirm', packageConfirmValidator.validate, packageController.confirm)
  router.put(packageRouteNames.update, '/packages/:id', packageUpdateValidator.validate, packageController.update)
  router.put(packageRouteNames.submitUpdate, '/packages/:id/submit', packageUpdateValidator.validate, packageController.submitUpdate)
  router.post(packageRouteNames.submitNew, '/packages/submit', packageSaveValidator.validate, packageController.submitNew)
  router.post(packageRouteNames.archive, '/packages/archive', packageController.archive)
  router.post(packageRouteNames.archive, '/packages/restore', packageController.restore)
  router.post(packageRouteNames.saveNew, '/packages', packageSaveValidator.validate, packageController.create)
  router.delete('/packages/:id', packageViewValidator.validate, packageController.del)

  return router
}
