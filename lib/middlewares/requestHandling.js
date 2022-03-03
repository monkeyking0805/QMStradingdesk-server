const debug = require('debug')('qms-tradingdesk-server:request')

module.exports = async function (ctx, next) {
  const { request } = ctx
  debug(
    request.method,
    `host:${request.header.host}`,
    `connection:${request.header.connection}`,
    `referer:${request.header.referer}`,
    `user-agent:${request.header['user-agent']}`
  )
  await next()
}
