const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/codes' })
const codeController = require('../../controllers/admin/codes')

module.exports = () => {
  router.post('/', codeController.create)
  router.get('/:codeID', codeController.view)
  router.put('/:codeID', codeController.update)
  router.get('/', codeController.list)
  router.del('/:codeID', codeController.del)
  return router
}
