'use strict'

const httpStatusUnauthorized = require('../config').http.clientError.unauthroized
const roleKeys = require('../config').static.roleKeys
const mustBeAdminErrorMessage = require('../config/error').auth.mustBeAdmin

module.exports = async function (ctx, next) {
  if (ctx.state.user.role.key !== roleKeys.admin) {
    ctx.throw(httpStatusUnauthorized, mustBeAdminErrorMessage)
  }

  await next()
}
