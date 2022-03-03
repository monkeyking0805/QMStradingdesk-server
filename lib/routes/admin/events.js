const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/events' })
const eventController = require('../../controllers/admin/events')
const listValidator = require('../../validators/events/list')
const viewValidator = require('../../validators/events/view')
const createValidator = require('../../validators/events/create')
const updateValidator = require('../../validators/events/update')
const deleteValidator = require('../../validators/events/delete')

module.exports = () => {
  router.post('/', listValidator.validate, eventController.list)
  router.get('/:id', viewValidator.validate, eventController.view)
  router.put('/:id', updateValidator.validate, eventController.update)
  router.delete('/:id', deleteValidator.validate, eventController.del)
  router.post('/archive', eventController.archive)
  router.post('/restore', eventController.restore)
  router.post('/create', createValidator.validate, eventController.create)
  router.post('/validateimport', eventController.validateImport)
  return router
}
