'use strict'

const knex = require('../db')
const tokenAge = require('../config').env.emailUpdate.tokenAge

module.exports = {
  create,
  findByToken,
  updateEmail
}

function create (createRequest) {
  const expireAt = new Date()
  expireAt.setMinutes(expireAt.getMinutes() + parseInt(tokenAge))
  createRequest.expire_at = expireAt

  return knex('email_update')
    .insert(createRequest)
}

function findByToken (uuid) {
  return knex('email_update').where('uuid', uuid).first()
}

function updateEmail (emailUpdateRequest) {
  return knex.transaction(async (trx) => {
    const rawSqlNow = knex.raw('NOW()')

    await trx('users')
      .where('id', emailUpdateRequest.user_id)
      .update({
        email: emailUpdateRequest.email,
        updated_at: rawSqlNow
      })

    await trx('email_update')
      .where('id', emailUpdateRequest.id)
      .update({
        expire_at: rawSqlNow
      })
  })
}
