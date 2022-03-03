'use strict'

const {
  error: { validation: errorValidationMessages },
  http: { clientError: { badRequest: httpStatusBadRequest } }
} = require('../../config')
const validator = require('../functions').common
const createRepository = require('../../repositories/repository')
const eventRepository = createRepository('events')
const assetUnitRepository = createRepository('asset_units')
const assetTypeRepository = createRepository('asset_types')
const is = require('is_js')

module.exports = {
  validate
}

async function validateId (id, fieldName, repository) {
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

function validateAssetUnit (assetUnitId) {
  return validateId(assetUnitId, 'Asset unit ID', assetUnitRepository)
}

function validateAssetType (assetTypeId) {
  return validateId(assetTypeId, 'Asset type ID', assetTypeRepository)
}

function validateEvent (eventId) {
  return validateId(eventId, 'Event ID', eventRepository)
}

function validateSlots (slots) {
  slots = validator.sanitiseNumber(slots)
  if (Number.isNaN(slots)) {
    return errorValidationMessages.mustBeInteger('Slots')
  } else if (!slots || (slots < 0)) {
    return errorValidationMessages.required('Slots')
  } else if (is.not.integer(slots)) {
    return errorValidationMessages.mustBeInteger('Slots')
  }
  return ''
}

async function validate (ctx, next) {
  const {
    slots,
    assetUnit,
    assetType,
    event
  } = ctx.request.body
  const errorSlots = validateSlots(slots)
  const errorAssetUnit = await validateAssetUnit(assetUnit)
  const errorAssetType = await validateAssetType(assetType)
  const errorEvent = await validateEvent(event)
  if (errorSlots || errorAssetUnit || errorAssetType || errorEvent) {
    const errors = {
      slots: errorSlots,
      assetUnit: errorAssetUnit,
      assetType: errorAssetType,
      event: errorEvent
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      statusCode: httpStatusBadRequest,
      message: errorValidationMessages.failed,
      errors
    }
    return ctx
  }
  ctx.request.body = {
    slots: validator.sanitiseNumber(slots),
    assetUnit: validator.sanitiseNumber(assetUnit),
    assetType: validator.sanitiseNumber(assetType),
    event: validator.sanitiseNumber(event)
  }
  await next(ctx)
}
