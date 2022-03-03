'use strict'

const router = require('koa-router')()
const codeController = require('../controllers/masterData/codes')

module.exports = () => {
  router.get('/codes', codeController.list)

  return router
}
