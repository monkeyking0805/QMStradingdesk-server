'use strict'

module.exports = function () {
  let text = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 7; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return text
}
