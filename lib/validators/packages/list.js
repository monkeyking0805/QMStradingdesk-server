'use strict'

const packageListOrderByColumns = require('../../config').static.packageListOrderByColumns
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
  const validColumns = Object.keys(packageListOrderByColumns)
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

async function validate (ctx, next) {
  let {
    page,
    items_per_page: itemsPerPage,
    order_by: orderBy,
    search,
    archive
  } = ctx.request.query

  const resultPage = validatePage(page)
  const resultItemsPerPage = validateItemsPerPage(itemsPerPage)
  const resultOrderBy = validateOrderBy(orderBy)
  const resultSearch = validateSearch(search)
  const resultArchive = validateArchive(archive)

  if (resultPage || resultItemsPerPage || resultOrderBy || resultSearch) {
    const errors = {
      page: resultPage,
      items_per_page: resultItemsPerPage,
      order_by: resultOrderBy,
      search: resultSearch,
      archive: resultArchive
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      page: page,
      items_per_page: itemsPerPage,
      order_by: orderBy,
      search: resultSearch,
      archive: resultArchive,
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
  if (search) {
    search = search.trim()
  }
  ctx.request.query = {
    page,
    items_per_page: itemsPerPage,
    order_by: orderBy,
    search,
    archive
  }
  await next()
}
