'use strict'

const { static: { paginateDefault } } = require('../config')

function getUrlParameters (ctx) {
  let {
    page,
    items_per_page: itemsPerPage
  } = ctx.request.query

  page = Number.parseInt(page)

  if (!page || Number.isNaN(page) || (page < 0)) {
    page = 1
  }

  itemsPerPage = Number.parseInt(itemsPerPage)

  if (!itemsPerPage || Number.isNaN(itemsPerPage) || (itemsPerPage < 0)) {
    itemsPerPage = paginateDefault.itemsPerPage.min
  }

  itemsPerPage = itemsPerPage > paginateDefault.itemsPerPage.max ? paginateDefault.itemsPerPage.max : itemsPerPage

  return {
    page,
    itemsPerPage
  }
}

const getListParameters = (ctx) => {
  const { page, itemsPerPage } = getUrlParameters(ctx)
  const { order_by: orderBy } = ctx.request.query
  return {
    page,
    itemsPerPage,
    orderBy: orderBy || 'name'
  }
}

module.exports = {
  getUrlParameters,
  getListParameters
}
