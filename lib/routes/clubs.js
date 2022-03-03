'use strict'

const router = require('koa-router')()
const clubController = require('../controllers/masterData/clubs')
const clubExclusionValidator = require('../validators/clubs/exclusions')

module.exports = () => {
  router.get('/clubs', clubController.list)
  router.get('/clubs/:id/exclusions', clubExclusionValidator.validate, clubController.exclusions)

  return router
}
