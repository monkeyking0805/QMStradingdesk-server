const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/brands' })
const brandController = require('../../controllers/admin/brands')

module.exports = () => {
  router.post('/', brandController.create)
  router.get('/:brandID', brandController.view)
  router.put('/:brandID', brandController.update)
  router.get('/', brandController.list)
  router.del('/:brandID', brandController.del)
  return router
}
