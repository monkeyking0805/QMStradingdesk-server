'use strict'

module.exports = {
  sql: {
    unknown: 'Unknown database connection issue',
    db: 'Database error. Please contact system administrator to report the issue'
  },
  auth: {
    incorrectLogin: 'Incorrect username and/or password.',
    mustBeAdmin: 'Must be administrator',
    userNotFound: 'User does not exist',
    notLoggedIn: 'Please login to continue.',
    authFailed: 'Authentication failed.',
    tokenFailed: 'API Key validation failed'
  },
  format: function (code, message) {
    return {
      statusCode: code,
      message
    }
  },
  users: {
    emailIsUsed: 'Email address already used. Please use a different email address.'
  },
  validation: {
    failed: 'Validation failed',
    exists: 'Already exists on system',
    notExists: 'Does not exist on system',
    doesNotExist: (field) => `"${field}" does not exist on system`,
    passwordRules: (minCharacters, minDigits, minLetters) => `Password must be at least ${minCharacters} characters, must contain at least ${minDigits} number and ${minLetters} letter`,
    invalidEmail: 'Email is invalid',
    cannotDeleteSelf: 'You are not allowed to delete yourself',
    cannotDisableSelf: 'You are not allowed to enable/disable yourself',
    mustBeThese: (values) => {
      return `Value must be one of these ['${values.join('\', \'')}']`
    },
    incorrectCurrentPassword: 'Current password is incorrect',
    mustNotBeEmptyString: 'Please fill in the required field',
    passwordReset: {
      invalidLink: 'Invalid password reset link',
      expired: 'Password reset link is already expired',
      samePassword: 'You are trying to use the same password as the current one'
    },
    emailUpdate: {
      invalidLink: 'Invalid email changing link',
      expired: 'Email changing link is already expired'
    },
    searchAssets: {
      requiredBrandCategory: 'Please select brand category'
    },
    required: (field) => `Please input ${field}`,
    maximum: (field, length) => `${field} exceeds maximum length of ${length}`,
    invalid: (field) => `${field} is invalid`,
    minimum: (field, length) => `${field} must be atleast ${length} characters`,
    package: {
      save: {
        noAssetsSelected: 'Please select some assets',
        assetNotExists: 'Asset does not exists on system',
        assetIsNotEnough: (availableSlots) => `Not enough available asset slot (available=${availableSlots})`
      },
      confirm: {
        mustBeSubmitted: 'Please submit this schedule before confirm it',
        alreadyConfirmed: 'This schedule has already been confirmed'
      },
      update: {
        onlyAdminCanUpdateNonDraft: 'Salesperson cannot update submitted/confirmed schedules',
        salesPersonCanOnlyUpdateOwn: 'Salesperson can only update own schedules'
      }
    },
    NaN: (field) => `Please input number for ${field}`,
    mustBeArrayOf: (field, typeOfArray) => `Please use array of ${typeOfArray} for ${field}`,
    assetUnits: {
      cannotDeleteLinkedAssetUnits: 'Deletion failed! An Asset Unit can not be deleted if any Assets are linked to it. Please remove all linked Assets first before continuing.'
    },
    assets: {
      cannotDeleteLinkedAssets: 'Deletion failed! An Asset can not be deleted if any Packages are linked to it. Please remove all linked Packages first before continuing.'
    },
    mustBeInteger: (field) => `Please input only integer for ${field}`,
    events: {
      cannotDeleteLinkedEvents: 'Deletion failed! An Event can not be deleted if any Assets are linked to it. Please remove any linked elements first before continuing.'
    }
  }
}
