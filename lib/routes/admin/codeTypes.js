const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/codeTypes' })
const codeTypeController = require('../../controllers/admin/codeTypes')

module.exports = () => {
  router.post('/', codeTypeController.create)
  router.get('/:codeTypeID', codeTypeController.view)
  router.put('/:codeTypeID', codeTypeController.update)
  router.get('/', codeTypeController.list)
  router.del('/:codeTypeID', codeTypeController.del)
  return router
}
