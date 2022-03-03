'use strict'

const router = require('koa-router')()
const codeTypeController = require('../controllers/masterData/codeTypes')

module.exports = () => {
  router.get('/codetypes', codeTypeController.list)

  return router
}
