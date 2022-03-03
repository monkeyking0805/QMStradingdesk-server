'use strict'

const httpStatus = require('../config/http')

module.exports = function (ctx, next) {
  function success (httpStatusCode, defaultBody) {
    return function (body = defaultBody) {
      ctx.status = httpStatusCode
      ctx.body = body
    }
  }

  function err (httpStatusCode) {
    return function (body = null) {
      ctx.throw(httpStatusCode, body)
    }
  }

  ctx.ok = success(httpStatus.successful.ok, httpStatus.messages.ok)
  ctx.created = success(httpStatus.successful.created, httpStatus.messages.created)

  ctx.notFound = err(httpStatus.clientError.notFound)
  ctx.badRequest = err(httpStatus.clientError.badRequest)
  ctx.conflict = err(httpStatus.clientError.conflict)
  ctx.forbidden = err(httpStatus.clientError.forbidden)
  ctx.gone = err(httpStatus.clientError.gone)
  ctx.unprocessableEntity = err()

  return next()
}
