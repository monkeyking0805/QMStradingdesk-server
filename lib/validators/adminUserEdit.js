'use strict'

const validator = require('node-validator')
const functions = require('./functions')
const UserStatuses = require('../enums/UserStatuses')

module.exports = function () {
  const allowStringOptions = { allowString: true }
  const userStatuses = [UserStatuses.enabled, UserStatuses.disabled]
  const rules = validator.isAnyObject()
    .withOptional('firstname', functions.isNotEmptyString)
    .withOptional('lastname', validator.isString())
    .withOptional('country', validator.isInteger(allowStringOptions))
    .withOptional('region', validator.isInteger(allowStringOptions))
    .withOptional('language', validator.isInteger(allowStringOptions))
    .withOptional('timezone', validator.isInteger(allowStringOptions))
    .withOptional('role', validator.isInteger(allowStringOptions))
    .withOptional('status', functions.isIn(userStatuses))
    .withOptional('phone', validator.isString())
    .withOptional('is_disabled', functions.isAny)

  rules.custom = {
    country: functions.isExistsInDb('countries', 'id'),
    region: functions.isExistsInDb('regions', 'id'),
    language: functions.isExistsInDb('languages'),
    timezone: functions.isExistsInDb('timezones', 'id'),
    role: functions.isExistsInDb('roles', 'id')
  }

  return rules
}
