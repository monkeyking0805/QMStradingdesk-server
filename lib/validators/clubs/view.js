'use strict'

const { invalid: invalidError } = require('../../config').error.validation
const clubRepository = require('../../repositories/club')
const validator = require('../functions').common

module.exports = {
  validate
}

async function validate (ctx, next) {
  let { id } = ctx.params
  id = validator.sanitiseNumber(id)

  if (Number.isNaN(id) || (id < 1)) {
    ctx.badRequest(invalidError('Club ID'))
  }

  const club = (await clubRepository.findById(id))

  if (!club) {
    ctx.notFound()
  }

  ctx.params.id = id
  ctx.state.club = club

  await next(ctx)
}
