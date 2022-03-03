'use strict'

const validator = require('node-validator')
const functions = require('./functions')

module.exports = function () {
  const allowStringOptions = { allowString: true }
  const rules = validator.isAnyObject()
    .withRequired('firstname', functions.isNotEmptyString)
    .withOptional('lastname', validator.isString())
    .withOptional('country', validator.isInteger(allowStringOptions))
    .withOptional('region', validator.isInteger(allowStringOptions))
    .withRequired('language', validator.isInteger(allowStringOptions))
    .withRequired('timezone', validator.isInteger(allowStringOptions))
    .withOptional('role', validator.isInteger(allowStringOptions))
    .withRequired('email', functions.isEmail)
    .withRequired('password', functions.isPassword)
    .withOptional('phone', validator.isString())

  rules.custom = {
    country: functions.isExistsInDb('countries', 'id'),
    region: functions.isExistsInDb('regions', 'id'),
    language: functions.isExistsInDb('languages'),
    timezone: functions.isExistsInDb('timezones', 'id'),
    role: functions.isExistsInDb('roles', 'id'),
    email: functions.isNotExistsInDb('users', 'email')
  }

  return rules
}
