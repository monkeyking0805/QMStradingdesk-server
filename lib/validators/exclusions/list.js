'use strict'

const httpStatusBadRequest = require('../../config').http.clientError.badRequest
const validateMessages = require('../../config').error.validation
const validator = require('../functions').common

module.exports = {
  validate
}

function validatePage (page) {
  let error = null
  page = (page || '').trim()
  if (!page) {
    return null
  }
  page = Number.parseInt(page)
  if (Number.isNaN(page) || (page < 1)) {
    error = validateMessages.invalid('Page')
  }
  return error
}

function validateItemsPerPage (itemsPerPage) {
  let error = null
  itemsPerPage = (itemsPerPage || '').trim()
  if (!itemsPerPage) {
    return null
  }
  itemsPerPage = Number.parseInt(itemsPerPage)
  if (Number.isNaN(itemsPerPage) || (itemsPerPage === 0) || (itemsPerPage < 1)) {
    error = validateMessages.invalid('Items per page')
  }
  return error
}

function validateArrayOfNumber (fieldName, value) {
  if (value && !Array.isArray(value)) {
    return validateMessages.mustBeArrayOf(fieldName, 'number')
  }
  return ''
}

async function validate (ctx, next) {
  let {
    page,
    items_per_page: itemsPerPage
  } = ctx.request.query

  const {
    brandCategories = [],
    brands = [],
    codeTypes = [],
    codes = [],
    clubs = [],
    venues = [],
    assetTypes = []
  } = ctx.request.body

  const resultPage = validatePage(page)
  const resultItemsPerPage = validateItemsPerPage(itemsPerPage)
  const errorBrandCategories = validateArrayOfNumber('Brand Category', brandCategories)
  const errorBrands = validateArrayOfNumber('Brand', brands)
  const errorCodeTypes = validateArrayOfNumber('Event type', codeTypes)
  const errorCodes = validateArrayOfNumber('Sport code', codes)
  const errorClubs = validateArrayOfNumber('Club', clubs)
  const errorVenues = validateArrayOfNumber('Venue', venues)
  const errorAssetTypes = validateArrayOfNumber('Asset type', assetTypes)

  if (resultPage || resultItemsPerPage || errorBrandCategories || errorBrands || errorCodeTypes || errorCodes || errorClubs || errorVenues || errorAssetTypes) {
    const errors = {
      page: resultPage,
      items_per_page: resultItemsPerPage,
      brandCategories: errorBrandCategories,
      brands: errorBrands,
      codeTypes: errorCodeTypes,
      codes: errorCodes,
      clubs: errorClubs,
      venues: errorVenues,
      assetTypes: errorAssetTypes
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      page: page,
      items_per_page: itemsPerPage,
      brandCategories,
      brands,
      codeTypes,
      codes,
      clubs,
      venues,
      assetTypes,
      errors
    }
    return ctx
  }

  if (!page) {
    page = 1
  }
  if (!itemsPerPage) {
    itemsPerPage = 10
  }
  ctx.request.query = {
    page,
    items_per_page: itemsPerPage
  }
  ctx.request.body = {
    brandCategories: validator.sanitiseArrayOfNumber(brandCategories),
    brands: validator.sanitiseArrayOfNumber(brands),
    codeTypes: validator.sanitiseArrayOfNumber(codeTypes),
    codes: validator.sanitiseArrayOfNumber(codes),
    clubs: validator.sanitiseArrayOfNumber(clubs),
    venues: validator.sanitiseArrayOfNumber(venues),
    assetTypes: validator.sanitiseArrayOfNumber(assetTypes)
  }
  await next(ctx)
}
