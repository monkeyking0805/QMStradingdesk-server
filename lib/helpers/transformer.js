'use strict'

module.exports = {
  removeTimestamps
}

function removeTimestamps (object) {
  function _removeTimestamps (object) {
    delete object.created_at
    delete object.updated_at

    return object
  }

  if (typeof object === 'object') {
    object = Array.isArray(object) ? object.map(_removeTimestamps) : _removeTimestamps(object)
  }

  return object
}
