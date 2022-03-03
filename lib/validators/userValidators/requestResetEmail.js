'use strict'

const validator = require('node-validator')
const functions = require('../functions')

module.exports = () => {
  return validator.isAnyObject()
    .withRequired('email', functions.isEmail)
}
