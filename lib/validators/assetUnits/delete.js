'use strict'

const viewValidator = require('./view')
const knex = require('../../db')
const { error: { validation: { assetUnits: { cannotDeleteLinkedAssetUnits } } } } = require('../../config')

module.exports = {
  validate
}

async function checkMustNotReferencedByAnyAssets (id) {
  return new Promise(function (resolve) {
    knex('assets')
      .where('asset_unit_id', id)
      .count()
      .first()
      .then((result) => {
        const count = parseInt(result.count)
        resolve(count === 0)
      })
  })
}

async function validate (ctx, next) {
  await viewValidator.validate(ctx, async (ctx) => {
    const { id } = ctx.params
    if (!await checkMustNotReferencedByAnyAssets(id)) {
      ctx.conflict(cannotDeleteLinkedAssetUnits)
    }
  })
  await next(ctx)
}
