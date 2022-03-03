'use strict'

const router = require('koa-router')()
const regionController = require('../controllers/masterData/regions')

module.exports = () => {
  router.get('/regions', regionController.list)

  return router
}
