'use strict'

const router = require('koa-router')()
const venueController = require('../controllers/masterData/venues')

module.exports = () => {
  router.get('/venues', venueController.list)

  return router
}
