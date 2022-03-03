'use strict'

const httpStatusBadRequest = require('../config').http.clientError.badRequest
const validationFailedMessage = require('../config').error.validation.failed
const errorFormat = require('../config').error.format
const nodeValidator = require('node-validator')

module.exports = function (rules, routeHandler) {
  return async function (ctx, next) {
    try {
      await validate(rules, ctx)
      return routeHandler(ctx, next)
    } catch (err) {
      return ctx
    }
  }
}

function validate (rules, ctx) {
  return new Promise(function (resolve, reject) {
    const _rules = rules()
    nodeValidator.run(_rules, ctx.request.body, async function (errorCount, errors) {
      function onError (message, childName, childValue) {
        errors.push({
          parameter: childName,
          value: childValue,
          message: message
        })
      }

      // Only perform custom validations when there is
      // no error from the first round validation.
      if ((errorCount === 0) && _rules.custom) {
        for (const fieldName of Object.keys(_rules.custom)) {
          const fieldValue = ctx.request.body[fieldName]
          const fieldValidator = _rules.custom[fieldName]
          if (fieldValue && fieldValidator && (typeof fieldValidator.validate === 'function')) {
            const result = await fieldValidator.validate(fieldValue, onError, fieldName)
            errorCount += (result === null) ? 0 : 1
          }
        }
      }

      if (errorCount === 0) {
        return resolve(true)
      } else {
        ctx.status = httpStatusBadRequest
        ctx.body = errorFormat(httpStatusBadRequest, validationFailedMessage)
        ctx.body.fields = formatValidationErrors(errors)

        return reject(errors)
      }
    })
  })
}

function formatValidationErrors (errors) {
  const fields = []
  for (const err of errors) {
    fields.push({
      message: err.message,
      field: err.parameter
    })
  }

  return fields
}
