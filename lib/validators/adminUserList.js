'use strict'

const is = require('is_js')
const {
  error: {
    validation: validateMessages
  },
  http: {
    clientError: {
      badRequest: httpStatusBadRequest
    }
  },
  static: {
    userListOrderByColumns
  }
} = require('../config')

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
  const validColumns = Object.keys(userListOrderByColumns)
  if (orderBy && !is.inArray(orderBy, validColumns)) {
    error = validateMessages.invalid('Order by')
  }
  return error
}

async function validate (ctx, next) {
  let {
    page,
    items_per_page: itemsPerPage,
    order_by: orderBy
  } = ctx.request.query

  const resultPage = validatePage(page)
  const resultItemsPerPage = validateItemsPerPage(itemsPerPage)
  const resultOrderBy = validateOrderBy(orderBy)

  if (resultPage || resultItemsPerPage || resultOrderBy) {
    const errors = {
      page: resultPage,
      items_per_page: resultItemsPerPage,
      order_by: resultOrderBy
    }
    ctx.status = httpStatusBadRequest
    ctx.body = {
      page: page,
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
    page,
    items_per_page: itemsPerPage,
    order_by: orderBy
  }
  await next()
}
