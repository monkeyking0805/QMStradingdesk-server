'use strict'

const viewValidator = require('./view')
const knex = require('../../db')
const { error: { validation: { assets: { cannotDeleteLinkedAssets } } } } = require('../../config')

module.exports = {
  validate
}

async function checkMustNotReferencedByAnyPackages (id) {
  const rawResult = await knex('packages_assets')
    .where('asset_id', id)
    .count()
    .first()
  return parseInt(rawResult.count) === 0
}

async function validate (ctx, next) {
  await viewValidator.validate(ctx, async (ctx) => {
    const { id } = ctx.params
    if (!await checkMustNotReferencedByAnyPackages(id)) {
      ctx.conflict(cannotDeleteLinkedAssets)
    }
  })
  await next(ctx)
}
