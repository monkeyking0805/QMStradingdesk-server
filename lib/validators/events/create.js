'use strict'

const config = require('../../config')
const { validation: errorValidationMessages } = config.error
const httpStatusBadRequest = config.http.clientError.badRequest
const validator = require('../functions').common
const createRepositoryService = require('../../repositories/repository')
const codeTypeRepository = createRepositoryService('code_types')
const venueRepository = createRepositoryService('venues')
const clubRepository = createRepositoryService('clubs')
const regionRepository = createRepositoryService('regions')

module.exports = {
  validate
}

async function validateId (id, fieldName, repository, isRequired = false) {
  if ((typeof id === 'undefined') || (id === null) || (id === '')) {
    if (isRequired) {
      return errorValidationMessages.required(fieldName)
    } else {
      return ''
    }
  }
  id = validator.sanitiseNumber(id)
  if (!validator.isIdValid(id)) {
    return errorValidationMessages.invalid(fieldName)
  } else {
    const isExist = await repository.isExists(id)
    if (!isExist) {
      return errorValidationMessages.doesNotExist(fieldName)
    }
  }
  return ''
}

function validateCodeTypeId (id) {
  return validateId(id, 'Code type ID', codeTypeRepository, true)
}

function validateVenueId (id) {
  return validateId(id, 'Venue ID', venueRepository)
}

function validateClubId (id) {
  return validateId(id, 'Club ID', clubRepository)
}

function validateRegionId (id) {
  return validateId(id, 'Region ID', regionRepository)
}

function validateRequiredDate (date, fieldName) {
  if (!date) {
    return errorValidationMessages.required(fieldName)
  }
  const _date = new Date(date)
  if (!(_date instanceof Date) || Number.isNaN(_date.getTime())) {
    return errorValidationMessages.invalid(fieldName)
  }
  return ''
}

function validateStartDate (date) {
  return validateRequiredDate(date, 'Start date')
}

function validateEndDate (endDate, startDate) {
  const errorRequiredDate = validateRequiredDate(endDate, 'End date')
  if (errorRequiredDate) {
    return errorRequiredDate
  }

  startDate = new Date(startDate)
  endDate = new Date(endDate)

  startDate = parseInt(startDate.getUTCFullYear() + ('00' + startDate.getUTCMonth()).substr(-2, 2) + ('00' + startDate.getUTCDate()).substr(-2, 2))
  endDate = parseInt(endDate.getUTCFullYear() + ('00' + endDate.getUTCMonth()).substr(-2, 2) + ('00' + endDate.getUTCDate()).substr(-2, 2))
  const daysDiff = endDate - startDate

  if (daysDiff < 0) {
    return 'End date must be equal or greater than Start date'
  }

  return ''
}

function validateRound (round) {
  if (typeof round !== 'undefined' && round !== null) {
    round = round / 1
    if (Number.isNaN(round)) {
      return errorValidationMessages.NaN('Round')
    }
  }
  return ''
}

function sanitise (requestJson) {
  return {
    name: validator.sanitiseString(requestJson.name),
    codeType: validator.sanitiseNumber(requestJson.codeType),
    venue: requestJson.venue ? validator.sanitiseNumber(requestJson.venue) : null,
    club: requestJson.club ? validator.sanitiseNumber(requestJson.club) : null,
    region: requestJson.region ? validator.sanitiseNumber(requestJson.region) : null,
    startDate: requestJson.startDate,
    endDate: requestJson.endDate,
    description: validator.sanitiseString(requestJson.description),
    round: ((typeof requestJson.round !== 'undefined') && (requestJson.round !== '') && (requestJson.round !== null)) ? validator.sanitiseNumber(requestJson.round) : null,
    isFta: requestJson.isFta,
    isPpv: requestJson.isPpv
  }
}

async function validateName (name, id = null) {
  name = validator.sanitiseString(name)
  if (!name) {
    return errorValidationMessages.required('Name')
  } else if (name.length > 100) {
    return errorValidationMessages.maximum('Name', 100)
  }
  return ''
}

function validateFtaPpv (isFta, isPpv) {
  if ((!isFta && !isPpv) || (isFta && isPpv)) {
    return 'Please choose either Simulcast or STV'
  }
  return ''
}

async function validate (ctx, next) {
  const {
    name = '',
    codeType,
    venue,
    club,
    region,
    startDate,
    endDate,
    description = '',
    round,
    isFta,
    isPpv
  } = ctx.request.body
  const errorName = await validateName(name)
  const errorCodeType = await validateCodeTypeId(codeType)
  const errorVenue = await validateVenueId(venue)
  const errorClub = await validateClubId(club)
  const errorRegion = await validateRegionId(region)
  const errorStartDate = await validateStartDate(startDate)
  const errorEndDate = await validateEndDate(endDate, startDate)
  const errorRound = await validateRound(round)
  const errorFtaPpv = await validateFtaPpv(isFta, isPpv)

  if (errorName ||
    errorCodeType ||
    errorVenue ||
    errorClub ||
    errorRegion ||
    errorStartDate ||
    errorEndDate ||
    errorRound ||
    errorFtaPpv) {
    const errors = {
      codeType: errorCodeType,
      venue: errorVenue,
      club: errorClub,
      region: errorRegion,
      startDate: errorStartDate,
      endDate: errorEndDate,
      round: errorRound,
      isFta: errorFtaPpv,
      isPpv: errorFtaPpv
    }

    const errorMessage = [
      errorName, errorCodeType, errorVenue, errorClub, errorRegion, errorStartDate, errorEndDate, errorRound, errorFtaPpv
    ]

    ctx.status = httpStatusBadRequest
    ctx.body = {
      statusCode: httpStatusBadRequest,
      message: errorMessage.filter((error) => error !== '').join(', '),
      errors
    }
    return ctx
  }
  ctx.request.body = sanitise({
    name,
    codeType,
    venue,
    club,
    region,
    startDate,
    endDate,
    description,
    round,
    isFta,
    isPpv
  })
  await next(ctx)
}
