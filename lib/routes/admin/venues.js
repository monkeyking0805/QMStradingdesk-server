const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/venues' })
const venueController = require('../../controllers/admin/venues')

module.exports = () => {
  router.post('/', venueController.create)
  router.get('/:venueID', venueController.view)
  router.put('/:venueID', venueController.update)
  router.get('/', venueController.list)
  router.del('/:venueID', venueController.del)
  return router
}
