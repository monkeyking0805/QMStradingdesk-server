'use strict'

const router = require('koa-router')()
const countryController = require('../controllers/masterData/countries')

module.exports = () => {
  router.get('/countries', countryController.list)

  return router
}
