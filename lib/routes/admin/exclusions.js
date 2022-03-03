'use strict'

const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/exclusions' })
const exclusionController = require('../../controllers/admin/exclusions')
const {
  list: exclusionListValidator,
  view: exclusionViewValidator,
  create: exclusionCreateValidator,
  update: exclusionUpdateValidator,
  delete: exclusionDeleteValidator
} = require('../../validators/exclusions')

module.exports = () => {
  router.post('/', exclusionListValidator.validate, exclusionController.list)
  router.get('/:id', exclusionViewValidator.validate, exclusionController.view)
  router.post('/create', exclusionCreateValidator.validate, exclusionController.create)
  router.put('/:id', exclusionUpdateValidator.validate, exclusionController.update)
  router.del('/:id', exclusionDeleteValidator.validate, exclusionController.del)
  router.post('/validateimport', exclusionController.validateImport)
  return router
}
