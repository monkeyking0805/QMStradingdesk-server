const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/brandcategories' })
const venueController = require('../../controllers/admin/brandCategories')

module.exports = () => {
  router.post('/', venueController.create)
  router.get('/:brandCategoryID', venueController.view)
  router.put('/:brandCategoryID', venueController.update)
  router.get('/', venueController.list)
  router.del('/:brandCategoryID', venueController.del)
  return router
}
