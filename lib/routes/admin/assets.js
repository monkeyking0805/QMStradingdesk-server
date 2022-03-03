'use strict'

const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/assets' })
const assetsController = require('../../controllers/admin/assets')
const listValidator = require('../../validators/assets/list')
const createValidator = require('../../validators/assets/create')
const viewValidator = require('../../validators/assets/view')
const updateValidator = require('../../validators/assets/update')
const deleteValidator = require('../../validators/assets/delete')

module.exports = () => {
  router.post('/', listValidator.validate, assetsController.list)
  router.get('/:id', viewValidator.validate, assetsController.view)
  router.put('/:id', updateValidator.validate, assetsController.update)
  router.del('/:id', deleteValidator.validate, assetsController.del)
  router.post('/archive', assetsController.archive)
  router.post('/restore', assetsController.restore)
  router.post('/create', createValidator.validate, assetsController.create)
  router.post('/validateimport', assetsController.validateImport)

  return router
}
