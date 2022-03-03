const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/assettypes' })
const codeController = require('../../controllers/admin/assetTypes')

module.exports = () => {
  router.post('/', codeController.create)
  router.get('/:assetTypeID', codeController.view)
  router.put('/:assetTypeID', codeController.update)
  router.get('/', codeController.list)
  router.del('/:assetTypeID', codeController.del)
  return router
}
