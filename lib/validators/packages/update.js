'use strict'

const validateMessages = require('../../config').error.validation
const { isParameterIdValidInteger } = require('../functions')
const packageRepository = require('../../repositories/package')
const config = require('../../config')
const { packageStatuses, routeNames: { packages: packageRouteNames } } = config.static
const { validation: errorValidationMessages } = config.error
const { package: { update: errorPackageUpdateMessages, confirm: errorPackageConfirmMessages } } = errorValidationMessages
const packageSaveValidator = require('./save')

module.exports = {
  validate
}

async function validate (ctx, next) {
  if (!isParameterIdValidInteger(ctx)) {
    ctx.badRequest(validateMessages.invalid('Booking ID'))
  }

  const { id } = ctx.params
  const { user } = ctx.state
  const pkg = await packageRepository.findById(id)

  if (!pkg) {
    ctx.notFound()
  }

  if (!user.isAdmin() && !user.isMyId(pkg.user_id)) {
    ctx.forbidden(errorPackageUpdateMessages.salesPersonCanOnlyUpdateOwn)
  }

  if (!user.isAdmin() && (pkg.status !== packageStatuses.draft)) {
    ctx.forbidden(errorPackageUpdateMessages.onlyAdminCanUpdateNonDraft)
  }

  if (ctx._matchedRouteName === packageRouteNames.submitUpdate && pkg.status === packageStatuses.approved) {
    ctx.forbidden(errorPackageConfirmMessages.alreadyConfirmed)
  }

  ctx.state.package = pkg

  await packageSaveValidator.validate(ctx, next)
}
