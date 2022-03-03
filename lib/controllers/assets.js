'use strict'

const config = require('../config')
const roleKeys = config.static.roleKeys
const debug = require('debug')('qms-tradingdesk-server:controllers:assets')
const error = require('debug')('qms-tradingdesk-server:controllers:assets:error')
const assetRepository = require('../repositories/asset')
const exclusionRepository = require('../repositories/exclusion')
const validSearchAssetParameters = config.static.validSearchParameters.asset
const transformSearchAssetResult = require('../transformers/assets/search').transform
const { requiredBrandCategory: requiredBrandCategoryErrorMessage } = config.error.validation.searchAssets

module.exports = {
  search
}

function validateSearchRequest (ctx) {
  const body = Object.assign({}, ctx.request.body)

  if ((ctx.state.user.role.key === roleKeys.sales) && (!body.brand_category_id)) {
    ctx.badRequest(requiredBrandCategoryErrorMessage)
  }

  const searchParameters = {}

  // Allow only valid search parameters
  for (const key of validSearchAssetParameters) {
    if (body.hasOwnProperty(key)) {
      searchParameters[key] = body[key]
    }
  }

  return searchParameters
}

async function search (ctx) {
  debug(search.name)

  try {
    const { user } = ctx.state
    const searchParameters = validateSearchRequest(ctx)
    const assets = await assetRepository.search(searchParameters, user)
    const exclusions = await exclusionRepository.getExclusionsByParams(searchParameters.brand_category_id)
    const searchResult = transformSearchAssetResult(assets, exclusions, searchParameters, user)
    searchResult.searchParameters = searchParameters
    ctx.ok(searchResult)
  } catch (err) {
    error(search.name, err)
    err.expose = true
    throw err
  }
}
