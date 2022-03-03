'use strict'

const { invalid: invalidError } = require('../../config').error.validation
const exclusionRepository = require('../../repositories/exclusion')
const validator = require('../functions').common

module.exports = {
  validate
}

async function validate (ctx, next) {
  let { id } = ctx.params
  id = validator.sanitiseNumber(id)

  if (Number.isNaN(id) || (id < 1)) {
    ctx.badRequest(invalidError('Exclusion ID'))
  }

  const exclusion = (await exclusionRepository.findById(id))

  if (!exclusion) {
    ctx.notFound()
  }

  ctx.params.id = id
  ctx.state.exclusion = exclusion

  await next(ctx)
}
