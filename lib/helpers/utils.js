'use strict'

module.exports = {
  toArray,
  displayCurrencyFormat
}

function toArray (obj, fx) {
  return Object.keys(obj).map((key) => {
    (typeof fx === 'function') && fx(obj[key])
    return obj[key]
  })
}

// Convert number to display $ currency format
// Return empty string if not input number
function displayCurrencyFormat (amount) {
  if (isNaN(parseInt(amount))) {
    return ''
  }
  return `$${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}
