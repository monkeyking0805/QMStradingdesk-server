'use strict'

const knex = require('../db')
const tableName = 'countries'

module.exports = {
  all,
  findById,
  findByName,
  findBy,
  isExists
}

function all () {
  return knex('countries').orderBy('name')
}

function findBy (criteria) {
  return knex(tableName)
    .where(criteria)
}

function findById (id) {
  return findBy({ id }).first()
}

function findByName (name) {
  return findBy({ name: name.toLowerCase() }).first()
}

function isExists (criteria) {
  return new Promise(function (resolve) {
    findBy(criteria).count('id').first()
      .then(function (result) {
        resolve(parseInt(result.count) > 0)
      })
  })
}
