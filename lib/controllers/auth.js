'use strict'

const config = require('../config')
const debug = require('debug')('qms-tradingdesk-server:controllers:auth')
const error = require('debug')('qms-tradingdesk-server:controllers:auth:error')
const passport = require('passport')
const auth = require('../helpers/auth')
const userRepository = require('../repositories/user')
const uuidv4 = require('uuid/v4')
const url = require('url')
const sendEmail = require('../helpers/email').send
const passwordResetRepository = require('../repositories/passwordReset')
const renderTemplate = require('../helpers/template').render
const passwordResetValidationMessages = config.error.validation.passwordReset
const formatJsonResponse = config.error.format

module.exports = {
  postLogin,
  requestToResetPassword,
  checkPasswordResetUuid,
  resetPassword
}

function postLogin (ctx, next) {
  debug(postLogin.name)

  return passport.authenticate('local', function (err, user, info) {
    if (err) {
      error(postLogin.name, err)

      err.status = config.http.serverError.internal
      err.message = err.hasOwnProperty('code') ? err.code : err.message
      err.expose = true

      throw err
    }

    if (!user) {
      ctx.response.status = config.http.clientError.badRequest
      if (info) {
        ctx.response.body = config.error.format(ctx.response.status, info.message)
      }
    }

    if (user) {
      ctx.response.status = config.http.successful.ok
      ctx.response.body = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname || '',
        role: user.role,
        timezone: user.timezone,
        language: user.language,
        country: user.country,
        region: user.region,
        token: auth.generateJwt(user)
      }
    }
  })(ctx, next)
}

async function requestToResetPassword (ctx) {
  debug(requestToResetPassword.name)

  try {
    const user = await userRepository.findByEmail(ctx.request.body.email)
    if (user) {
      const uuid = uuidv4()

      await passwordResetRepository
        .create({
          user_id: user.id,
          uuid
        })

      const passwordResetUrl = url.resolve(config.env.clientBaseUrl, config.static.clientRequestPaths.passwordReset(uuid))

      const emailBodyHtml = await renderTemplate('resetPassword.html', {
        link: passwordResetUrl
      })

      await sendEmail(user.email, config.static.email.passwordReset.subject, emailBodyHtml)
    }

    ctx.ok(formatJsonResponse(config.http.successful.ok, config.http.messages.passwordReset.emailIsSent))
  } catch (err) {
    error(requestToResetPassword.name, err)
    err.expose = true
    throw err
  }
}

async function validatePasswordResetUuid (ctx) {
  const passwordResetRequest = await passwordResetRepository.findByUuid(ctx.params.uuid)

  if (!passwordResetRequest) {
    ctx.notFound(passwordResetValidationMessages.invalidLink)
  }

  if (passwordResetRequest.expire_at < (new Date())) {
    ctx.gone(passwordResetValidationMessages.expired)
  }

  return passwordResetRequest
}

async function checkPasswordResetUuid (ctx) {
  debug(checkPasswordResetUuid.name)

  try {
    await validatePasswordResetUuid(ctx)
    ctx.ok(formatJsonResponse(config.http.successful.ok, config.http.messages.ok))
  } catch (err) {
    error(checkPasswordResetUuid.name, err)
    if (err.hasOwnProperty('routine') && (err.routine === 'string_to_uuid')) {
      ctx.notFound(passwordResetValidationMessages.invalidLink)
    }
    err.expose = true
    throw err
  }
}

async function resetPassword (ctx) {
  debug(resetPassword.name)

  try {
    const passwordResetRequest = await validatePasswordResetUuid(ctx)
    const user = await userRepository.find(passwordResetRequest.user_id, true)

    if (auth.verifyPassword(ctx.request.body.password, user.password)) {
      ctx.conflict(passwordResetValidationMessages.samePassword)
    }

    const password = ctx.request.body.password
    await userRepository.update(passwordResetRequest.user_id, {
      password: auth.encryptPassword(password)
    })
    await passwordResetRepository.expire(passwordResetRequest.id)

    ctx.ok(formatJsonResponse(config.http.successful.ok, config.http.messages.passwordReset.succuessfullyReset))
  } catch (err) {
    error(resetPassword.name, err)
    if (err.hasOwnProperty('routine') && (err.routine === 'string_to_uuid')) {
      ctx.notFound(passwordResetValidationMessages.invalidLink)
    }
    err.expose = true
    throw err
  }
}
