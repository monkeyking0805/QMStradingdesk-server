'use strict'

const is = require('is_js')
const assetRepository = require('../../repositories/asset')
const brandCategoryRepository = require('../../repositories/brandCategory')
const httpStatusBadRequest = require('../../config').http.clientError.badRequest
const validationMessages = require('../../config').error.validation

module.exports = {
  validate
}

function normalizePackageName (name) {
  return name.trim().replace(/\s+/g, ' ')
}

async function validatePackageDetails (ctx) {
  let { name = '', notes = '' } = ctx.request.body
  name = normalizePackageName(name)
  let errorName = null

  if (!name) {
    errorName = validationMessages.required('Name of the Booking')
  } else if (name.length > 200) {
    errorName = validationMessages.maximum('Name of the Booking', 200)
  }

  if (errorName) {
    return {
      name,
      errors: {
        name: errorName
      }
    }
  }

  ctx.request.body.name = normalizePackageName(name)
  ctx.request.body.notes = notes.trim()
}

async function validateRequestClient (ctx) {
  const {
    client: {
      company_name: companyName,
      firstname,
      lastname = '',
      agency_name: agencyName = ''
    } = {
      companyName: '',
      firstname: '',
      lastname: '',
      agencyName: ''
    }
  } = ctx.request.body

  const isPut = ctx.method === 'PUT'

  let errorCompanyName = ''
  let errorFirstname = ''
  let errorLastname = ''
  let errorAgencyName = ''
  const errorId = ''

  if (typeof companyName === 'undefined' || is.empty(companyName.trim())) {
    errorCompanyName = validationMessages.required('Company Name')
  }

  if (lastname.trim().length > 64) {
    errorCompanyName = validationMessages.maximum('Company Name', 64)
  }

  if (typeof firstname === 'undefined' || is.empty(firstname.trim())) {
    errorFirstname = validationMessages.required('First Name')
  }

  /* remove name length validation
  if (firstname.trim().length < 3) {
    errorFirstname = 'Firstname must > 2'
  }
  */

  if (firstname.trim().length > 64) {
    errorFirstname = validationMessages.maximum('First Name', 64)
  }

  if (lastname.trim().length > 64) {
    errorLastname = validationMessages.maximum('Last Name', 64)
  }

  if (agencyName.trim().length > 64) {
    errorAgencyName = validationMessages.maximum('Agency Name', 64)
  }

  if (errorFirstname || errorLastname || errorCompanyName || errorAgencyName || errorId) {
    const errors = {
      ...ctx.request.body.client,
      errors: {
        company_name: errorCompanyName,
        firstname: errorFirstname,
        lastname: errorLastname,
        agency_name: errorAgencyName
      }
    }
    if (isPut) {
      errors.errors.id = errorId
    }
    return errors
  }

  ctx.request.body.client = {
    company_name: companyName.trim(),
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    agency_name: agencyName.trim()
  }

  return null
}

function transformToObjectWithIdAsKey (arr) {
  const newObject = {}
  for (const item of arr) {
    newObject[item.id] = item
  }
  return newObject
}

function validateRequestAsset (requestAsset, allAsset) {
  const {
    asset_id: assetId = '',
    slots = ''
  } = requestAsset
  let errorAssetId = ''
  let errorSlots = ''
  if (is.empty(assetId)) {
    errorAssetId = validationMessages.required('Asset ID')
  } else if (is.not.number(assetId)) {
    errorAssetId = validationMessages.invalid('Asset ID')
  }
  if (is.empty(slots)) {
    errorSlots = validationMessages.required('Asset Slots')
  } else if (is.not.number(slots)) {
    errorSlots = validationMessages.invalid('Asset Slots')
  }

  if (!errorAssetId || !errorSlots) {
    const asset = !errorAssetId ? allAsset[assetId] : undefined

    if (is.empty(errorAssetId) && is.undefined(asset)) {
      errorAssetId = validationMessages.package.save.assetNotExists
    }
    if (is.not.undefined(slots) && is.number(slots) && is.not.undefined(asset) && slots > asset.available_slots) {
      errorSlots = validationMessages.package.save.assetIsNotEnough(asset.available_slots)
    }
    if (!errorAssetId && !errorSlots) {
      return null
    }
  }

  return {
    id: errorAssetId,
    slots: errorSlots
  }
}

async function validateRequestAssets (ctx) {
  const packageId = ctx.params.id ? ctx.params.id / 1 : null
  const { assets: requestAssets } = ctx.request.body

  if (!Array.isArray(requestAssets) || (requestAssets.length === 0)) {
    return validationMessages.package.save.noAssetsSelected
  }

  const assetsIds = requestAssets.map((asset) => asset.asset_id)
  const requestAssetId = []

  let isError = false
  const errorRequestAssets = []
  const sanitizedRequestAssets = []
  const allAsset = transformToObjectWithIdAsKey((await assetRepository.getAvailableSlots(assetsIds, packageId)).rows)

  for (const requestAsset of requestAssets) {
    const {
      asset_id: assetId,
      bonus,
      slots
    } = requestAsset

    const errors = validateRequestAsset(requestAsset, allAsset)
    isError = isError || (errors !== null)

    requestAsset.errors = errors

    errorRequestAssets.push(requestAsset)
    if ((errors === null) && (slots > 0)) {
      requestAssetId.unshift(assetId)
      requestAsset.bonus = bonus !== 0 ? bonus : 0
      sanitizedRequestAssets.push(requestAsset)
    }
  }

  if (!isError) {
    if (!Array.isArray(sanitizedRequestAssets) || (sanitizedRequestAssets.length === 0)) {
      return validationMessages.package.save.noAssetsSelected
    }

    ctx.request.body.assets = sanitizedRequestAssets
  }

  return isError ? errorRequestAssets : null
}

function validateBrandCategory (brandCategoryId, brandCategories) {
  const found = brandCategories.hasOwnProperty(brandCategoryId)
  return found ? null : validationMessages.invalid(`Brand category id: ${brandCategoryId}`)
}

async function validateBrandCategories (ctx) {
  const { brand_categories: brandCategoryIds } = ctx.request.body

  if (!brandCategoryIds || !Array.isArray(brandCategoryIds) || (brandCategoryIds.length === 0)) {
    return null
  }

  let isError = false
  const sanitizedBrandCategoryIds = []
  const errorBrandCategoryIds = []
  const allBrandCategories = transformToObjectWithIdAsKey((await brandCategoryRepository.all()).rows)

  for (const brandCategoryId of brandCategoryIds) {
    const errors = validateBrandCategory(brandCategoryId, allBrandCategories)
    isError = isError || (errors !== null)

    errorBrandCategoryIds.push(errors)
    if (errors === null) {
      sanitizedBrandCategoryIds.push(Number.parseInt(brandCategoryId))
    }
  }

  if (!isError) {
    ctx.request.body.brand_categories = sanitizedBrandCategoryIds
  }

  return isError ? errorBrandCategoryIds : null
}

async function validate (ctx, next) {
  const resultPackageDetails = await validatePackageDetails(ctx)
  const resultBrandCategories = await validateBrandCategories(ctx)
  const resultClient = await validateRequestClient(ctx)
  const resultAssets = await validateRequestAssets(ctx)

  if (resultPackageDetails || resultBrandCategories || resultClient || resultAssets) {
    const errors = {
      brand_categories: resultBrandCategories,
      package: resultPackageDetails,
      client: resultClient,
      assets: resultAssets
    }

    ctx.status = httpStatusBadRequest
    ctx.body = {
      statusCode: httpStatusBadRequest,
      message: validationMessages.failed,
      errors
    }
    return ctx
  }
  await next()
}
