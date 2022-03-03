'use strict'

const {
  http: { clientError: httpClientErrors },
  error: { auth: { authFailed: authFailedErrorMessage } },
  env: { jwt: { secret: jwtSecretKey } },
  static: { roleKeys }
} = require('../config')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/user')

module.exports = async function (ctx, next) {
  const token = getToken(ctx.request)

  if (token) {
    let jwtUser = false

    try {
      jwtUser = jwt.verify(token, jwtSecretKey)
      ctx.state.jwtUser = jwtUser
    } catch (err) {
      err.status = httpClientErrors.unauthroized
      err.expose = true

      ctx.state.jwtError = err
    }

    if (jwtUser) {
      try {
        const user = await userRepository.find(jwtUser.id)

        if (!user) {
          const err = new Error()
          err.status = httpClientErrors.badRequest
          err.message = authFailedErrorMessage
          err.expose = true
          throw err
        }

        if (user.is_disabled) {
          const err = new Error()
          err.status = httpClientErrors.unauthroized
          err.message = authFailedErrorMessage
          err.expose = true
          throw err
        }

        user.isAdmin = function () {
          return this.role.key === roleKeys.admin
        }

        user.isMyId = function (id) {
          return this.id === id
        }

        ctx.state.user = user
      } catch (err) {
        throw err
      }
    }
  }

  await next()
}

function getToken (request) {
  const { headers: { authorization } } = request

  /*
  Authorization header format is
    Bearer <token>
  This block will check if matched HTTP header is sent
  Then extract <token> from the HTTP header
  */
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }

  return false
}
