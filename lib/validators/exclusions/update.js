'use strict'

const viewValidator = require('./view')
const createValidator = require('./create')

module.exports = {
  validate
}

async function validate (ctx, next) {
  await viewValidator.validate(ctx, async (ctx) => {
    await createValidator.validate(ctx, next)
  })
}
