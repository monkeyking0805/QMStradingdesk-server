'use strict'

const validator = require('node-validator')
const functions = require('./functions')
const UserStatuses = require('../enums/UserStatuses')

module.exports = function () {
  const userStatuses = [UserStatuses.enabled, UserStatuses.disabled]
  const rules = validator.isAnyObject()
    .withRequired('status', functions.isIn(userStatuses))

  return rules
}
