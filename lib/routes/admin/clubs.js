const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/clubs' })
const clubController = require('../../controllers/admin/clubs')

module.exports = () => {
  router.post('/', clubController.create)
  router.get('/:clubID', clubController.view)
  router.put('/:clubID', clubController.update)
  router.get('/', clubController.list)
  router.del('/:clubID', clubController.del)
  return router
}
