'use strict'

const config = require('../config')
const debug = require('debug')('qms-tradingdesk-server:controller:users')
const error = require('debug')('qms-tradingdesk-server:controller:users:error')
const userRepository = require('../repositories/user')
const editEmailRepository = require('../repositories/editEmail')
const authHelpers = require('../helpers/auth')
const uuidv4 = require('uuid/v4')
const sendEmail = require('../helpers/email').send
const renderTemplate = require('../helpers/template').render
const url = require('url')
const { validation: validationMessages, format: formatJsonResponse } = config.error
const { static: { userUpdatableColumns } } = config
const { removeTimestamps } = require('../helpers/transformer')

module.exports = {
  view,
  edit,
  setPassword,
  requestResetEmail,
  resetEmail
}

async function view (ctx) {
  debug(view.name)
  try {
    const user = removeTimestamps(await userRepository.find(ctx.state.user.id))
    ctx.ok(user)
  } catch (err) {
    error(view.name, err)
    err.expose = true
    throw err
  }
}

function getUpdateParameters (ctx) {
  const result = {}
  for (const column in userUpdatableColumns) {
    if (ctx.request.body.hasOwnProperty(column) && (column !== 'is_disabled')) {
      result[userUpdatableColumns[column]] = ctx.request.body[column]
    }
  }
  return result
}

async function edit (ctx) {
  debug(edit.name)
  try {
    const user = await userRepository.find(ctx.state.user.id)
    const updateParameters = getUpdateParameters(ctx)

    await userRepository.update(user.id, updateParameters)

    const updatedUser = removeTimestamps(await userRepository.find(user.id))
    ctx.ok(updatedUser)
  } catch (err) {
    error(edit.name, err)
    err.expose = true
    throw err
  }
}

async function validateSetPassword (ctx) {
  const { password } = ctx.request.body
  const user = await userRepository.find(ctx.state.user.id, true)

  if (!authHelpers.verifyPassword(password, user.password)) {
    ctx.badRequest(validationMessages.incorrectCurrentPassword)
  }

  return user
}

async function setPassword (ctx) {
  debug(setPassword.name)

  try {
    const user = await validateSetPassword(ctx)

    const { newpassword } = ctx.request.body
    const updateParameters = {
      password: authHelpers.encryptPassword(newpassword)
    }

    await userRepository.update(user.id, updateParameters)

    ctx.ok({
      token: authHelpers.generateJwt(user)
    })
  } catch (err) {
    error(setPassword.name, err)
    err.expose = true
    throw err
  }
}

async function validateRequestResetEmail (ctx) {
  const email = ctx.request.body.email.trim().toLowerCase()
  const user = await userRepository.findByEmail(email)

  if (user) {
    ctx.conflict(config.error.users.emailIsUsed)
  }

  return email
}

async function sendResetEmailConfirmation (email, uuid) {
  const passwordResetUrl = url
    .resolve(config.env.clientBaseUrl, config.static.clientRequestPaths.emailUpdate(uuid))

  const emailBodyHtml = await renderTemplate('updateEmail.html', {
    link: passwordResetUrl
  })

  return sendEmail(email, config.static.email.passwordReset.subject, emailBodyHtml)
}

async function requestResetEmail (ctx) {
  debug(requestResetEmail.name)

  try {
    const email = await validateRequestResetEmail(ctx)
    const uuid = uuidv4()

    await editEmailRepository
      .create({
        email,
        uuid,
        user_id: ctx.state.user.id
      })

    await sendResetEmailConfirmation(email, uuid)

    ctx.ok(formatJsonResponse(config.http.successful.ok, config.http.messages.emailUpdate.emailIsSent))
  } catch (err) {
    error(requestResetEmail.name, err)
    err.expose = true
    throw err
  }
}

async function validateResetEmail (ctx) {
  const editEmailRequest = await editEmailRepository.findByToken(ctx.params.uuid)

  if (!editEmailRequest) {
    ctx.notFound(validationMessages.emailUpdate.invalidLink)
  }

  if (editEmailRequest.expire_at < (new Date())) {
    ctx.gone(validationMessages.emailUpdate.expired)
  }

  return editEmailRequest
}

async function resetEmail (ctx) {
  debug(resetEmail.name)

  try {
    const editEmailRequest = await validateResetEmail(ctx)

    await editEmailRepository.updateEmail(editEmailRequest)
    ctx.ok(formatJsonResponse(config.http.successful.ok, config.http.messages.emailUpdate.succuessfullyChanged))
  } catch (err) {
    error(resetEmail.name, err)
    if (err.hasOwnProperty('routine') && (err.routine === 'string_to_uuid')) {
      ctx.notFound(validationMessages.emailUpdate.invalidLink)
    }
    err.expose = true
    throw err
  }
}
