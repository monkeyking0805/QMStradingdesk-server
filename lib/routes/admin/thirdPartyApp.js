const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/apps' })
const appController = require('../../controllers/admin/apps')

module.exports = () => {
  router.post('/', appController.create)
  router.get('/:thirdPartyAppID', appController.view)
  router.put('/:thirdPartyAppID', appController.update)
  router.get('/', appController.list)
  router.del('/:thirdPartyAppID', appController.del)
  return router
}
