'use strict'

const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/users' })
const userController = require('../../controllers/admin/users')
const validateForm = require('../../middlewares/validateForm')
const adminUserCreate = require('../../validators/adminUserCreate')
const adminUserEdit = require('../../validators/adminUserEdit')
const adminUserSetEnabled = require('../../validators/adminUserSetEnabled')
const adminUserList = require('../../validators/adminUserList')
const adminUserSetPasswordValidator = require('../../validators/adminUserSetPassword')

module.exports = () => {
  router.post('/', validateForm(adminUserCreate, userController.createUser))
  router.get('/', adminUserList.validate, userController.list)
  router.put('/:id', validateForm(adminUserEdit, userController.edit))
  router.get('/:id', userController.view)
  router.del('/:id', userController.del)
  router.put('/:id/status', validateForm(adminUserSetEnabled, userController.setEnabled))
  router.put('/:id/password', validateForm(adminUserSetPasswordValidator, userController.setPassword))

  return router
}
