'use strict'

const validateMessages = require('../../config').error.validation
const { isParameterIdValidInteger } = require('../functions')
const packageRepository = require('../../repositories/package')
const config = require('../../config')
const { packageStatuses } = config.static
const { auth: errorAuthMessages, validation: errorValidationMessages } = config.error
const { package: { confirm: errorPackageConfirmMessages } } = errorValidationMessages
const packageSaveValidator = require('./save')

module.exports = {
  validate
}

async function validate (ctx, next) {
  const { user } = ctx.state

  if (!user.isAdmin()) {
    ctx.forbidden(errorAuthMessages.mustBeAdmin)
  }

  if (!isParameterIdValidInteger(ctx)) {
    ctx.badRequest(validateMessages.invalid('Booking ID'))
  }

  const { id } = ctx.params
  const pkg = await packageRepository.findById(id)

  if (!pkg) {
    ctx.notFound()
  }

  if (pkg.status === packageStatuses.draft) {
    ctx.conflict(errorPackageConfirmMessages.mustBeSubmitted)
  } else if (pkg.status === packageStatuses.approved) {
    ctx.conflict(errorPackageConfirmMessages.alreadyConfirmed)
  }

  ctx.state.package = pkg

  await packageSaveValidator.validate(ctx, next)
}
