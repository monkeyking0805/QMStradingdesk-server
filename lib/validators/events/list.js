'use strict'

const { eventsOrderByColumns } = require('../../config').static
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
  const validColumns = Object.keys(eventsOrderByColumns)
  if (orderBy && !is.inArray(orderBy, validColumns)) {
    error = validateMessages.invalid('Order by')
  }
  return error
}

function validateSearch (search) {
  let error = null
  search = (search || '').trim()
  if (search && search.length < 3) {
    error = validateMessages.minimum('Name', 3)
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

function validateDate (fieldName, date) {
  const _date = new Date(date)
  if (!(_date instanceof Date) || Number.isNaN(_date.getTime())) {
    return validateMessages.invalid(fieldName)
  }
  return ''
}

async function validate (ctx, next) {
  const {
    page,
    items_per_page: itemsPerPage,
    order_by: orderBy
  } = ctx.request.query
  const {
    name = '',
    codes = [],
    venues = [],
    clubs = [],
    regions = [],
    startDate = '',
    endDate = '',
    archive = ''
  } = ctx.request.body

  const errorPage = validatePage(page)
  const errorItemsPerPage = validateItemsPerPage(itemsPerPage)
  const errorOrderBy = validateOrderBy(orderBy)
  const errorName = validateSearch(name)
  const errorArchive = validateArchive(archive)
  const errorCodes = validateArrayOfNumber('Sport code', codes)
  const errorVenues = validateArrayOfNumber('Venue', venues)
  const errorClubs = validateArrayOfNumber('Club', clubs)
  const errorRegions = validateArrayOfNumber('Region', regions)
  const errorStartDate = startDate ? validateDate('Start date', startDate) : ''
  const errorEndDate = endDate ? validateDate('End date', endDate) : ''

  if (errorPage || errorItemsPerPage || errorOrderBy || errorName || errorCodes || errorVenues || errorClubs || errorRegions || errorStartDate || errorEndDate) {
    const errors = {
      page: errorPage,
      items_per_page: errorItemsPerPage,
      order_by: errorOrderBy,
      name: errorName,
      codes: errorCodes,
      venues: errorVenues,
      clubs: errorClubs,
      regions: errorRegions,
      startDate: errorStartDate,
      endDate: errorEndDate,
      archive: errorArchive
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      page: page,
      items_per_page: itemsPerPage,
      order_by: orderBy,
      name,
      codes,
      venues,
      clubs,
      regions,
      startDate,
      endDate,
      errors,
      archive
    }
    return ctx
  }
  ctx.request.query = {
    page: page || 1,
    items_per_page: itemsPerPage || 10,
    order_by: orderBy || 'start_date'
  }
  ctx.request.body = {
    name: validator.sanitiseString(name),
    archive: validator.sanitiseString(archive),
    codes: validator.sanitiseArrayOfId(codes),
    venues: validator.sanitiseArrayOfId(venues),
    clubs: validator.sanitiseArrayOfId(clubs),
    regions: validator.sanitiseArrayOfId(regions),
    startDate,
    endDate
  }
  await next(ctx)
}
