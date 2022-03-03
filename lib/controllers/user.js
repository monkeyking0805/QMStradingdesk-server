'use strict'

const debug = require('debug')('gomeeki-service-boilerplate:controllers:user')
const { error } = require('../config')

module.exports = {
  get
}

async function get (ctx) {
  debug(get.name)

  ctx.checkParams('id').notEmpty().isInt()

  if (ctx.errors) {
    ctx.status = 400
    ctx.body = ctx.errors
    return
  }

  debug(ctx.token)

  // get user from db
  const user = await ctx.models.User.find(ctx.params.id)

  if (!user) {
    ctx.status = 404
    ctx.body = { message: error.user.notFound }
    return
  }

  ctx.body = user
}
