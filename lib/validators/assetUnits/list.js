'use strict'

const { assetUnitsOrderByColumns } = require('../../config').static
const httpStatusBadRequest = require('../../config').http.clientError.badRequest
const validateMessages = require('../../config').error.validation
const is = require('is_js')

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

function validateOrderBy (orderBy) {
  let error = null
  orderBy = (orderBy || '').trim().toLowerCase()
  const validColumns = Object.keys(assetUnitsOrderByColumns)
  if (orderBy && !is.inArray(orderBy, validColumns)) {
    error = validateMessages.invalid('Order by')
  }
  return error
}

function validateArchive (archive) {
  let error = null
  if (archive !== 'TRUE' && archive !== 'FALSE') {
    error = 'archive should be true or false'
  }
  return error
}

async function validate (ctx, next) {
  let {
    name,
    page,
    archive,
    items_per_page: itemsPerPage,
    order_by: orderBy
  } = ctx.request.query

  const resultPage = validatePage(page)
  const resultArchive = validateArchive(archive)
  const resultOrderBy = validateOrderBy(orderBy)
  const resultItemsPerPage = validateItemsPerPage(itemsPerPage)

  if (resultPage || resultItemsPerPage || resultOrderBy || resultArchive) {
    const errors = {
      page: resultPage,
      archive: resultArchive,
      items_per_page: resultItemsPerPage,
      order_by: resultOrderBy
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      page: page,
      arvhive: archive,
      items_per_page: itemsPerPage,
      order_by: orderBy,
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
    name,
    page,
    archive,
    items_per_page: itemsPerPage,
    order_by: orderBy
  }
  await next(ctx)
}
