'use strict'

const config = require('../../config')
const { validation: errorValidationMessages } = config.error
const httpStatusBadRequest = config.http.clientError.badRequest
const validator = require('../functions').common
const knex = require('../../db')

module.exports = {
  validate
}

function validateArrayOfNumber (fieldName, values) {
  if (!Array.isArray(values)) {
    return errorValidationMessages.mustBeArrayOf(fieldName, 'ID (number)')
  }
  const arrayOfNaN = values.filter((num) => !validator.isNumber(num))
  if (arrayOfNaN.length > 0) {
    return errorValidationMessages.NaN(`${fieldName} (${arrayOfNaN.join(', ')})`)
  }
  return ''
}

async function validateAllMemberExists (fieldName, values, tableName, knex) {
  const notExist = await validator.doNotExist(tableName, values, knex)
  if (notExist.length > 0) {
    return `The following ${fieldName} do not exist in the database: (${notExist.join(', ')})`
  }
  return ''
}

async function validateArrayOfId (fieldName, values, tableName, knex) {
  const firstError = validateArrayOfNumber(fieldName, values)
  if (!firstError) {
    const secondError = await validateAllMemberExists(fieldName, values, tableName, knex)
    return secondError
  }
  return firstError
}

function validateArrayMustNotBeAllEmpty (fieldNames, arrayOfArray) {
  const countAllMember = arrayOfArray.reduce((a, b) => a + b.length, 0)
  if (countAllMember === 0) {
    return `Please select at least 1 value to create a valid exclusion ${fieldNames.join(', ')}`
  }
  return ''
}

function validateNote (note) {
  if (note && (typeof note !== 'string')) {
    return 'Note must be string'
  }
  if (note && (note.trim().length > 4096)) {
    return errorValidationMessages.maximum('Note', 4096)
  }
  return ''
}

function sanitise (requestJson) {
  return {
    note: validator.sanitiseString(requestJson.note),
    brandCategories: validator.sanitiseArrayOfId(requestJson.brandCategories),
    brands: validator.sanitiseArrayOfId(requestJson.brands),
    clubs: validator.sanitiseArrayOfId(requestJson.clubs),
    codeTypes: validator.sanitiseArrayOfId(requestJson.codeTypes),
    venues: validator.sanitiseArrayOfId(requestJson.venues),
    assetTypes: validator.sanitiseArrayOfId(requestJson.assetTypes)
  }
}

async function validate (ctx, next) {
  const {
    note = '',
    brandCategories = [],
    brands = [],
    clubs = [],
    codeTypes = [],
    venues = [],
    assetTypes = []
  } = ctx.request.body
  const errorBrandCategories = await validateArrayOfId('Brand Category', brandCategories, 'brand_categories', knex)
  const errorBrands = await validateArrayOfId('Brand', brands, 'brands', knex)
  const errorClubs = await validateArrayOfId('Club', clubs, 'clubs', knex)
  const errorCodeTypes = await validateArrayOfId('Code Type', codeTypes, 'code_types', knex)
  const errorVenues = await validateArrayOfId('Venue', venues, 'venues', knex)
  const errorAssetTypes = await validateArrayOfId('Asset Type', assetTypes, 'asset_types', knex)
  let errorNothingSelected = ''

  if ((errorBrandCategories + errorBrands + errorClubs + errorCodeTypes + errorVenues + errorAssetTypes) === '') {
    errorNothingSelected = validateArrayMustNotBeAllEmpty([], [brandCategories, brands, clubs, codeTypes, venues, assetTypes])
  }

  const errorNote = validateNote(note)

  if (errorBrandCategories ||
    errorBrands ||
    errorClubs ||
    errorCodeTypes ||
    errorVenues ||
    errorAssetTypes ||
    errorNothingSelected ||
    errorNote) {
    const errors = {
      note: errorNote,
      brandCategories: errorBrandCategories,
      brands: errorBrands,
      clubs: errorClubs,
      codeTypes: errorCodeTypes,
      venues: errorVenues,
      assetTypes: errorAssetTypes
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      statusCode: httpStatusBadRequest,
      message: (errorNothingSelected || errorValidationMessages.failed),
      errors
    }
    return ctx
  }
  ctx.request.body = sanitise({
    note,
    brandCategories,
    brands,
    clubs,
    codeTypes,
    venues,
    assetTypes
  })
  await next(ctx)
}
