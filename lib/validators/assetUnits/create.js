'use strict'

const config = require('../../config')
const { auth: errorAuthMessages, validation: errorValidationMessages } = config.error
const httpStatusBadRequest = config.http.clientError.badRequest
const validator = require('../functions').common

module.exports = {
  validate
}

async function validate (ctx, next) {
  const { user } = ctx.state

  if (!user.isAdmin()) {
    ctx.forbidden(errorAuthMessages.mustBeAdmin)
  }

  const {
    name,
    duration,
    price_fta: priceFta,
    price_ppv: pricePpv,
    price_min: priceMin,
    fee_production: feeProduction,
    fee_installation: feeInstallation,
    links,
    cost
  } = ctx.request.body

  let errorName = ''
  let errorDuration = ''
  let errorPriceFta = ''
  let errorPricePpv = ''
  let errorPriceMin = ''
  let errorFeeProduction = ''
  let errorFeeInstallation = ''
  let errorLinks = ''

  let sanitisedName
  let sanitisedDuration
  let sanitisedPriceFta
  let sanitisedPricePpv
  let sanitisedPriceMin
  let sanitisedFeeProduction
  let sanitisedFeeInstallation
  let sanitisedLinks

  if (!name || (typeof name !== 'string') || (name.trim().length === 0)) {
    errorName = errorValidationMessages.required('Name')
  }

  if (!duration || (duration.toString().trim().length === 0)) {
    errorDuration = errorValidationMessages.required('Duration')
  }

  if (validator.isEmpty(priceFta)) {
    errorPriceFta = errorValidationMessages.required('Price Simulcast')
  } else {
    sanitisedPriceFta = validator.sanitiseNumber(priceFta)

    if (Number.isNaN(sanitisedPriceFta)) {
      errorPriceFta = errorValidationMessages.NaN('Price Simulcast')
    } else if (sanitisedPriceFta === 0) {
      errorPriceFta = errorValidationMessages.required('Price Simulcast')
    }
  }

  if (validator.isEmpty(pricePpv)) {
    errorPricePpv = errorValidationMessages.required('Price STV')
  } else {
    sanitisedPricePpv = validator.sanitiseNumber(pricePpv)

    if (Number.isNaN(sanitisedPricePpv)) {
      errorPricePpv = errorValidationMessages.NaN('Price STV')
    } else if (sanitisedPricePpv === 0) {
      errorPricePpv = errorValidationMessages.required('Price STV')
    }
  }

  if (priceMin > pricePpv) {
    errorPriceMin = errorValidationMessages.required('Price should be less then Price STV')
  } else {
    sanitisedPriceMin = validator.sanitiseNumber(priceMin)

    if (Number.isNaN(sanitisedPricePpv)) {
      errorPriceMin = errorValidationMessages.NaN('Price MIN')
    } else if (sanitisedPricePpv === 0) {
      errorPriceMin = errorValidationMessages.required('Price MIN')
    }
  }

  sanitisedFeeInstallation = validator.sanitiseNumber(feeInstallation)
  sanitisedFeeProduction = validator.sanitiseNumber(feeProduction)

  if (Number.isNaN(sanitisedFeeInstallation)) {
    errorFeeInstallation = errorValidationMessages.NaN('Installation cost')
  }

  if (Number.isNaN(sanitisedFeeProduction)) {
    errorFeeProduction = errorValidationMessages.required('Production cost')
  }

  if (links && !Array.isArray(links)) {
    errorLinks = errorValidationMessages.mustBeArrayOf('Links', 'string')
  }

  if (errorName ||
    errorDuration ||
    errorPriceFta ||
    errorPricePpv ||
    errorPriceMin ||
    errorFeeInstallation ||
    errorFeeProduction ||
    errorLinks) {
    const errors = {
      name: errorName,
      duration: errorDuration,
      price_fta: errorPriceFta,
      price_ppv: errorPricePpv,
      price_min: errorPriceMin,
      fee_production: errorFeeProduction,
      fee_installation: errorFeeInstallation,
      links: errorLinks
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      statusCode: httpStatusBadRequest,
      message: errorValidationMessages.failed,
      errors
    }
    return ctx
  }

  sanitisedName = validator.sanitiseString(name)
  sanitisedDuration = validator.sanitiseString(duration)
  sanitisedLinks = Array.isArray(links) ? validator.sanitiseArrayOfStrings(links) : []
  ctx.request.body = {
    name: sanitisedName,
    duration: sanitisedDuration,
    price_fta: sanitisedPriceFta,
    price_ppv: sanitisedPricePpv,
    price_min: sanitisedPriceMin,
    fee_installation: sanitisedFeeInstallation,
    fee_production: sanitisedFeeProduction,
    links: sanitisedLinks,
    cost
  }
  await next(ctx)
}
