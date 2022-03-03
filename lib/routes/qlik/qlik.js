'use strict'

const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/qlik' })
const qlikController = require('../../controllers/qlik/qlik')

module.exports = () => {
  router.get('/packages', qlikController.getPackagesList)
  return router
}
