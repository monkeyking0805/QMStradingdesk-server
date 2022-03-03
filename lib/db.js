'use strict'

const dbParameters = require('../knexfile')
const knex = require('knex')(dbParameters)

module.exports = knex
