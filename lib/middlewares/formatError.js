'use strict'

const errorFormat = require('../config').error.format

module.exports = function (ctx, next) {
  return next().catch((err) => {
    const isHttp4XXor5XX = (typeof err.status === 'number') && (err.status >= 400) && (err.status <= 599)

    if (isHttp4XXor5XX) {
      const { status, message } = err
      ctx.response.status = status
      ctx.response.body = errorFormat(status, message)
    } else {
      throw err
    }
  })
}
