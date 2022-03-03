'use strict'

const debug = require('debug')('qms-tradingdesk-server:app')
const error = require('debug')('qms-tradingdesk-server:app:error')
const config = require('./config')
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const health = require('koa-heartbeat')(config.static.app.health)
const routes = require('./routes')
const passport = require('koa-passport')
const auth = require('./helpers/auth')
const session = require('koa-session')
const koaValidate = require('koa-validate')
const formatError = require('./middlewares/formatError')
const checkJwt = require('./middlewares/checkJwt')
module.exports = {
  start
}

async function start () {
  const app = new Koa()

  koaValidate(app)

  app.keys = config.env.appKey
  auth.configPassport()

  app.use(session(app))

  app.use(health)
  app.use(bodyparser())
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(formatError)
  app.use(checkJwt)

  routes(app)

  return app
    .listen(config.env.port)
    .on('error', err => _handleErr(err))
}

function _handleErr (err) {
  debug(_handleErr.name)
  error(err.message)
}
