'use strict'

const router = require('koa-router')()
const timezoneController = require('../controllers/masterData/timezones')

module.exports = () => {
  router.get('/timezones', timezoneController.list)

  return router
}
