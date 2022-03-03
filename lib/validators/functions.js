'use strict'

const config = require('../config')
const is = require('is_js')
const knex = require('../db')

module.exports = {
  isPassword: {
    validate: isPassword
  },
  isEmail: {
    validate: isEmail
  },
  isNotExistsInDb,
  isExistsInDb,
  isIn,
  isNotEmptyString: {
    validate: isNotEmptyString
  },
  isParameterIdValidInteger,
  isIdValid,
  isAny: {
    validate: isAny
  },
  common: {
    sanitiseString,
    sanitiseNumber,
    sanitiseArrayOfStrings,
    isEmpty,
    sanitiseArrayOfNumber,
    doNotExist,
    isNumber,
    sanitiseArrayOfNumbers,
    sanitiseArrayOfId,
    isIdValid
  }
}

function isPassword (value, onError) {
  const passwordIsNotQualifiedErrorMessage = config.error.validation.passwordRules(8, 1, 1)

  if (value.length < 8) {
    return onError(passwordIsNotQualifiedErrorMessage)
  }

  if (!/[0-9]/.test(value)) {
    return onError(passwordIsNotQualifiedErrorMessage)
  }

  if (!/[a-zA-Z]/.test(value)) {
    return onError(passwordIsNotQualifiedErrorMessage)
  }

  return null
}

function isEmail (value, onError) {
  if (!is.email(value)) {
    return onError(config.error.validation.invalidEmail)
  }

  return null
}

function isNotExistsInDb (table, column) {
  return {
    validate: async function (value, onError, fieldName) {
      const { count } = await knex(table).count('*').where(column, value).first()
      if (parseInt(count) > 0) {
        return onError(config.error.validation.exists, fieldName)
      }

      return null
    }
  }
}

function isExistsInDb (table, column = 'id') {
  return {
    validate: async function (value, onError, fieldName) {
      const { count } = await knex(table).count('*').where(column, value).first()
      if (parseInt(count) === 0) {
        return onError(config.error.validation.notExists, fieldName)
      }

      return null
    }
  }
}

function isIn (values) {
  return {
    validate: function (value, onError, fieldName) {
      if (!is.inArray(value, values)) {
        return onError(config.error.validation.mustBeThese(values))
      }
      return null
    }
  }
}

function isNotEmptyString (value, onError, fieldName) {
  if ((typeof value !== 'string') || (value.trim().length === 0)) {
    return onError(config.error.validation.mustNotBeEmptyString)
  }

  return null
}

function isParameterIdValidInteger (ctx) {
  let { id } = ctx.params
  id = id / 1
  return isIdValid(id)
}

function isIdValid (id) {
  return !Number.isNaN(id) && (id > 0)
}

function isAny (value, onError) {
  return null
}

function sanitiseString (value) {
  return value.trim()
}

function sanitiseNumber (value) {
  return (value || 0) / 1
}

function sanitiseArrayOfStrings (values) {
  const firstPass = values.map((value) => (value || '').trim())
  return firstPass.filter((value) => value !== '')
}

function sanitiseArrayOfNumber (values) {
  return values.filter((value) => !Number.isNaN(value / 1))
}

function isEmpty (value) {
  return (typeof value === 'undefined') || (value === null) || (value === '')
}

/**
 * This function will return an array of id those do not exist in table
 * @param {*} table Target table
 * @param {*} arrayOfId Array of ID
 * @param {*} connection Maybe knex transaction or knex object itself
 */
function doNotExist (table, arrayOfId, connection = null) {
  if (connection === null) {
    connection = knex
  }
  return new Promise((resolve) => {
    connection(table)
      .select(connection.raw('ARRAY_AGG(id) found'))
      .first()
      .then(({ found }) => {
        const setFound = new Set(found)
        const notExist = arrayOfId.filter((id) => !setFound.has(id))
        resolve(notExist)
      })
  })
}

function isNumber (value) {
  return value && !Number.isNaN(value / 1)
}

function sanitiseArrayOfNumbers (values) {
  const firstPass = values.map((value) => sanitiseNumber(value))
  return firstPass.filter((value) => value > 0)
}

function sanitiseArrayOfId (values) {
  const sanitised = sanitiseArrayOfNumbers(values)
  // return unique
  return sanitised.filter((value, index) => sanitised.indexOf(value) === index)
}
