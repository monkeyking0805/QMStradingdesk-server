'use strict'

const router = require('koa-router')()
const roleController = require('../controllers/masterData/roles')

module.exports = () => {
  router.get('/roles', roleController.list)

  return router
}
