'use strict'

const debug = require('debug')('qms-tradingdesk-server:controller:helpers:validateField')
const moment = require('moment')

const validateEnum = (item, enumArray) => {
  debug(validateEnum.name)
  // If it not Array then return false
  if (!Array.isArray(enumArray)) return false
  return enumArray.includes(item)
}

const validateDate = (date, dateFormat) => {
  debug(validateDate.name)
  //  Return true or false to valid date format
  return moment(date, dateFormat, true).isValid()
}

module.exports = {
  validateEnum,
  validateDate
}
