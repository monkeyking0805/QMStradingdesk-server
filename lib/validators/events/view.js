'use strict'

const { invalid: invalidError } = require('../../config').error.validation
const eventRepository = require('../../repositories/event')
const validator = require('../functions').common

module.exports = {
  validate
}

async function validate (ctx, next) {
  let { id } = ctx.params
  id = validator.sanitiseNumber(id)

  if (Number.isNaN(id) || (id < 1)) {
    ctx.badRequest(invalidError('Event ID'))
  }

  const event = (await eventRepository.findById(id))

  if (!event) {
    ctx.notFound()
  }

  ctx.params.id = id
  ctx.state.event = event

  await next(ctx)
}
