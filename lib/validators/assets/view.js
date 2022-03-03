'use strict'

const { invalid: invalidError } = require('../../config').error.validation
const assetRepository = require('../../repositories/asset')
const validator = require('../functions').common

module.exports = {
  validate
}

async function validate (ctx, next) {
  let { id } = ctx.params
  id = validator.sanitiseNumber(id)

  if (Number.isNaN(id) || (id < 1)) {
    ctx.badRequest(invalidError('Asset ID'))
  }

  const asset = await assetRepository.findById(id)

  if (!asset) {
    ctx.notFound()
  }

  ctx.params.id = id
  ctx.state.asset = asset

  await next(ctx)
}
