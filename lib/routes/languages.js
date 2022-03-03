'use strict'

const router = require('koa-router')()
const languageController = require('../controllers/masterData/languages')

module.exports = () => {
  router.get('/languages', languageController.list)

  return router
}
