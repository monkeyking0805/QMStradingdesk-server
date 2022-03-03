'use strict'

const config = require('../config')
const bcrypt = require('bcryptjs')
const passport = require('koa-passport')
const Strategy = require('passport-local').Strategy
const knex = require('../db')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/user')

module.exports = {
  encryptPassword,
  verifyPassword,
  configPassport,
  generateJwt
}

function encryptPassword (password) {
  const salt = bcrypt.genSaltSync()

  return bcrypt.hashSync(password, salt)
}

function verifyPassword (password, hash) {
  return bcrypt.compareSync(password, hash)
}

function configPassport () {
  passport.use(new Strategy({
    usernameField: 'email'
  },
  async function (email, password, cb) {
    try {
      const user = await userRepository.findByEmail(email, true)

      if (!user) {
        return cb(null, false, { message: config.error.auth.incorrectLogin })
      }

      if (!verifyPassword(password, user.password)) {
        return cb(null, false, { message: config.error.auth.incorrectLogin })
      }

      if (user.is_disabled) {
        return cb(null, false, { message: config.error.auth.incorrectLogin })
      }

      return cb(null, user)
    } catch (err) {
      return cb(err)
    }
  }))

  passport.serializeUser(function (user, cb) {
    cb(null, user.id)
  })

  passport.deserializeUser(function (id, cb) {
    knex('users').where('id', id).first()
      .then(function (user) {
        cb(null, user)
      })
      .catch(function (err) {
        cb(err, false)
      })
  })
}

function generateJwt (user) {
  const payload = {
    id: user.id,
    email: user.email
  }

  return jwt.sign(payload, config.env.jwt.secret, { expiresIn: 60 * config.env.jwt.age })
}
