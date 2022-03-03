'use strict'

const knex = require('../db')
const tableName = 'password_reset'

module.exports = {
  all,
  findById,
  findByUuid,
  findBy,
  isExists,
  create,
  expire
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

function findByUuid (uuid) {
  return findBy({ uuid }).where('expire_at', '>', knex.fn.now()).first()
}

function isExists (criteria) {
  return new Promise(function (resolve) {
    findBy(criteria).count('id').first()
      .then(function (result) {
        resolve(parseInt(result.count) > 0)
      })
  })
}

function create (params) {
  const expireAt = new Date()
  expireAt.setMinutes(expireAt.getMinutes() + parseInt(60))

  return knex('password_reset')
    .insert({
      user_id: params.user_id,
      uuid: params.uuid,
      expire_at: expireAt
    })
}

function expire (id) {
  return knex('password_reset')
    .where('id', id)
    .update({
      expire_at: knex.fn.now(),
      updated_at: knex.fn.now()
    })
}
