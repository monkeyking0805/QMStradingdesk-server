'use strict'

const validator = require('node-validator')
const functions = require('./functions')

module.exports = function () {
  const rules = validator.isAnyObject()
    .withRequired('newpassword', functions.isPassword)

  return rules
}
