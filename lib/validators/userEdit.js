'use strict'

const validator = require('node-validator')
const functions = require('./functions')

module.exports = function () {
  const allowStringOptions = { allowString: true }
  const rules = validator.isAnyObject()
    .withOptional('firstname', functions.isNotEmptyString)
    .withOptional('lastname', validator.isString())
    .withOptional('country', validator.isInteger(allowStringOptions))
    .withOptional('region', validator.isInteger(allowStringOptions))
    .withOptional('language', validator.isInteger(allowStringOptions))
    .withOptional('timezone', validator.isInteger(allowStringOptions))
    .withOptional('phone', validator.isString())

  rules.custom = {
    country: functions.isExistsInDb('countries', 'id'),
    region: functions.isExistsInDb('regions', 'id'),
    language: functions.isExistsInDb('languages'),
    timezone: functions.isExistsInDb('timezones', 'id')
  }

  return rules
}
