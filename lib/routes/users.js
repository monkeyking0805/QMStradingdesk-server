'use strict'

const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/user/profile' })
const userController = require('../controllers/users')
const userEditValidation = require('../validators/userEdit')
const userSetPasswordValidation = require('../validators/userSetPassword')
const { requestResetEmailValidators } = require('../validators/userValidators')
const validateForm = require('../middlewares/validateForm')

module.exports = () => {
  router.get('/', userController.view)
  router.put('/', validateForm(userEditValidation, userController.edit))
  router.put('/password', validateForm(userSetPasswordValidation, userController.setPassword))

  router.post('/resetemail', validateForm(requestResetEmailValidators, userController.requestResetEmail))
  // Temporary move to auth route to bypass authenication requirement
  // router.put('/resetemail/:uuid', userController.resetEmail)

  return router
}
