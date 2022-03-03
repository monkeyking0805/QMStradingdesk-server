'use strict'

const httpStatusOk = require('../../config').http.successful.ok
const knex = require('../../db')
const { removeTimestamps } = require('../../helpers/transformer')

module.exports = {
  list
}

async function list (ctx, next) {
  ctx.status = httpStatusOk
  ctx.body = removeTimestamps(await knex('languages').orderBy('name'))
}
