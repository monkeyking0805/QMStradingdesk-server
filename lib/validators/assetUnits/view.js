'use strict'

const { invalid: invalidError } = require('../../config').error.validation
const assetUnitController = require('../../repositories/assetUnit')
const validator = require('../functions').common

module.exports = {
  validate
}

async function validate (ctx, next) {
  let { id } = ctx.params
  id = validator.sanitiseNumber(id)

  if (Number.isNaN(id) || (id < 1)) {
    ctx.badRequest(invalidError('Asset Units ID'))
  }

  const assetUnit = (await assetUnitController.findById(id))

  if (!assetUnit) {
    ctx.notFound()
  }

  ctx.params.id = id
  ctx.state.assetUnit = assetUnit

  await next(ctx)
}
