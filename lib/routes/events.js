'use strict'

const router = require('koa-router')()
const eventController = require('../controllers/masterData/events')

module.exports = () => {
  router.get('/events', eventController.list)

  return router
}
