'use strict'

const router = require('koa-router')()
const brandController = require('../controllers/masterData/brands')

module.exports = () => {
  router.get('/brands', brandController.list)

  return router
}
