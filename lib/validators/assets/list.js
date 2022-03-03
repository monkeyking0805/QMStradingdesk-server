'use strict'

const { assetsOrderByColumns } = require('../../config').static
const httpStatusBadRequest = require('../../config').http.clientError.badRequest
const validateMessages = require('../../config').error.validation
const is = require('is_js')
const validator = require('../functions').common

module.exports = {
  validate
}

function validatePage (page) {
  let error = ''
  page = (page || '').trim()
  if (!page) {
    return ''
  }
  page = Number.parseInt(page)
  if (Number.isNaN(page) || (page < 1)) {
    error = validateMessages.invalid('Page')
  }
  return error
}

function validateItemsPerPage (itemsPerPage) {
  let error = ''
  itemsPerPage = (itemsPerPage || '').trim()
  if (!itemsPerPage) {
    return ''
  }
  itemsPerPage = Number.parseInt(itemsPerPage)
  if (Number.isNaN(itemsPerPage) || (itemsPerPage === 0) || (itemsPerPage < 1)) {
    error = validateMessages.invalid('Items per page')
  }
  return error
}

function validateOrderBy (orderBy) {
  let error = ''
  orderBy = (orderBy || '').trim().toLowerCase()
  const validColumns = Object.keys(assetsOrderByColumns)
  if (orderBy && !is.inArray(orderBy, validColumns)) {
    error = validateMessages.invalid('Order by')
  }
  return error
}

function validateSearch (search) {
  let error = null
  search = (search || '').trim()
  if (search && search.length < 3) {
    error = validateMessages.minimum('Search', 3)
  }
  return error
}

function validateArchive (archive) {
  let error = null
  archive = (archive || '').trim()
  if (archive !== 'TRUE' || archive !== 'FALSE') {
    error = 'archive should be true or false'
  }
  return error
}

function validateArrayOfNumber (fieldName, value) {
  if ((value !== null) && (typeof value !== 'undefined') && !Array.isArray(value)) {
    return validateMessages.mustBeArrayOf(fieldName, 'number')
  }
  return ''
}

async function validate (ctx, next) {
  let {
    page,
    items_per_page: itemsPerPage,
    order_by: orderBy
  } = ctx.request.query
  const {
    name = '',
    archive = '',
    codes = [],
    events = [],
    assetTypes = []
  } = ctx.request.body

  const errorPage = validatePage(page)
  const errorItemsPerPage = validateItemsPerPage(itemsPerPage)
  const errorOrderBy = validateOrderBy(orderBy)
  const errorName = validateSearch(name)
  const errorArchive = validateArchive(archive)
  const errorCodes = validateArrayOfNumber('Sport code', codes)
  const errorEvents = validateArrayOfNumber('Event', events)
  const errorAssetTypes = validateArrayOfNumber('Asset type', assetTypes)

  if (errorPage || errorItemsPerPage || errorOrderBy || errorName || errorCodes || errorEvents || errorAssetTypes) {
    const errors = {
      page: errorPage,
      items_per_page: errorItemsPerPage,
      order_by: errorOrderBy,
      name: errorName,
      archive: errorArchive,
      codes: errorCodes,
      events: errorEvents,
      assetTypes: errorAssetTypes
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      page: page,
      items_per_page: itemsPerPage,
      order_by: orderBy,
      name,
      archive,
      codes,
      events,
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
  if (!orderBy) {
    orderBy = 'name'
  }
  ctx.request.query = {
    page,
    items_per_page: itemsPerPage,
    order_by: orderBy
  }
  ctx.request.body = {
    name: validator.sanitiseString(name),
    archive: validator.sanitiseString(archive),
    codes: validator.sanitiseArrayOfId(codes),
    events: validator.sanitiseArrayOfId(events),
    assetTypes: validator.sanitiseArrayOfId(assetTypes)
  }
  await next(ctx)
}
