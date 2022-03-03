'use strict'

const validateMessages = require('../../config').error.validation

module.exports = {
  validate
}

async function validate (ctx, next) {
  let { id } = ctx.params
  id = Number.parseInt(id)
  if (Number.isNaN(id) || (id < 1)) {
    ctx.badRequest(validateMessages.invalid('Booking ID'))
  }
  ctx.params.id = id
  await next()
}
