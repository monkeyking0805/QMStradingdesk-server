'use strict'

const httpStatusUnauthorized = require('../config').http.clientError.unauthroized
const tokenFailed = require('../config').error.auth.tokenFailed
const thirdPartyAppRepository = require('../repositories/thirdPartyApp')

module.exports = async function (ctx, next) {
  const result = await thirdPartyAppRepository.findByKey(ctx.get('api-authorize-key'))
  if (result.length === 0) {
    ctx.throw(httpStatusUnauthorized, tokenFailed)
  }
  await next()
}
