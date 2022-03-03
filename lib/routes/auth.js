'use strict'

const router = require('koa-router')()
const authController = require('../controllers/auth')
const validateForm = require('../middlewares/validateForm')
const requestToResetPasswordValidation = require('../validators/requestToResetPassword')
const resetPasswordValidation = require('../validators/resetPassword')
const userController = require('../controllers/users')

module.exports = () => {
  router.post('/login', authController.postLogin)
  router.post('/resetpassword', validateForm(requestToResetPasswordValidation, authController.requestToResetPassword))
  router.get('/resetpassword/:uuid', authController.checkPasswordResetUuid)
  router.put('/resetpassword/:uuid', validateForm(resetPasswordValidation, authController.resetPassword))
  // Temporary move to auth route to bypass authenication requirement
  router.put('/user/profile/resetemail/:uuid', userController.resetEmail)

  return router
}
