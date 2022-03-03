'use strict'

const httpStatusUnauthorized = require('../config').http.clientError.unauthroized
const notLoggedInErrorMessage = require('../config').error.auth.notLoggedIn

module.exports = async function (ctx, next) {
  if (ctx.state.jwtError) {
    throw ctx.state.jwtError
  }

  if (!ctx.state.user) {
    ctx.throw(httpStatusUnauthorized, notLoggedInErrorMessage)
  }

  await next()
}
