'use strict'

const knex = require('../db')
const { static: { roleKeys } } = require('../config')
const selects = (withPassword) => `
  users.id,
  users.email,
  ${withPassword ? 'users.password,' : ''}
  users.firstname,
  users.lastname,
  users.phone,
  users.is_disabled,
  CASE WHEN countries.id IS NOT NULL THEN ROW_TO_JSON((SELECT _countries FROM (SELECT countries.id, countries.name) _countries)) ELSE NULL end "country",
  CASE WHEN regions.id IS NOT NULL THEN ROW_TO_JSON((SELECT _regions FROM (SELECT regions.id, regions.name) _regions)) ELSE NULL end "region",
  CASE WHEN languages.id IS NOT NULL THEN ROW_TO_JSON((SELECT _languages FROM (SELECT languages.id, languages.name) _languages)) ELSE NULL end "language",
  CASE WHEN timezones.id IS NOT NULL THEN ROW_TO_JSON((SELECT _timezones FROM (SELECT timezones.id, timezones.name, timezones.zone) _timezones)) ELSE NULL end "timezone",
  CASE WHEN roles.id IS NOT NULL THEN ROW_TO_JSON((SELECT _roles FROM (SELECT roles.id, roles.name, roles.key) _roles)) ELSE NULL end "role"`

module.exports = {
  list,
  find,
  findByEmail,
  setRole,
  update,
  del,
  disable,
  findAllAdmins,
  countAll
}

function userJoins (initialKnexBuilder, withPassword) {
  return initialKnexBuilder
    .leftJoin('users_roles', 'users_roles.user_id', 'users.id')
    .leftJoin('roles', 'users_roles.role_id', 'roles.id')
    .leftJoin('timezones', 'timezones.id', 'users.timezone_id')
    .leftJoin('regions', 'regions.id', 'users.region_id')
    .leftJoin('countries', 'countries.id', 'users.country_id')
    .leftJoin('languages', 'languages.id', 'users.language_id')
    .select(knex.raw(selects(withPassword)))
    .where('users.is_deleted', false)
}

/**
 * @param {*} orderBy   An Array or String of "users." columns eg. 'users.id' or ['users.firstname', 'users.email']
 * @param {function}      modifier  A function to post-process the result
 */
function list (page, itemsPerPage, orderBy = 'users.id', withPassword = false) {
  return userJoins(knex('users'), withPassword)
    .orderByRaw(orderBy)
    .limit(itemsPerPage)
    .offset(itemsPerPage * (page - 1))
}

function find (id, withPassword = false) {
  return userJoins(knex('users')
    .where('users.id', id), withPassword).first()
}

function findByEmail (email, withPassword = false) {
  return userJoins(knex('users')
    .where('users.email', email), withPassword).first()
}

function findAllAdmins (withPassword = false) {
  return userJoins(knex('users')
    .where('roles.key', roleKeys.admin), withPassword)
}

function setRole (userId, roleId, trx) {
  return knex('users_roles').count('*').where('user_id', userId).transacting(trx).first()
    .then(function (countResult) {
      const { count } = countResult
      if (parseInt(count) > 0) {
        return knex('users_roles').update({
          role_id: roleId,
          updated_at: knex.raw('NOW()')
        }).where('user_id', userId).transacting(trx)
      }

      return knex('users_roles').insert({
        user_id: userId,
        role_id: roleId
      }).transacting(trx)
    })
}

/**
 * Update user and optional set new role
 * @param {integer} id ID of the user to be updated
 * @param {object} params hash of the parameters for updating
 * @param {integer} newRoleId ID of role for this user.
 */
function update (id, params, newRoleId = false) {
  params.updated_at = knex.raw('NOW()')
  return knex.transaction(function (trx) {
    knex('users')
      .where('id', id)
      .update(params, 'id')
      .transacting(trx)
      .then(updatedUserIds => {
        if (newRoleId && (updatedUserIds.length > 0)) {
          const updatedUserId = updatedUserIds[0]
          return setRole(updatedUserId, newRoleId, trx)
        }
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
}

function del (id) {
  return knex('users')
    .where('id', id)
    .update({
      is_deleted: true
    })
}

function disable (id, disabled = true) {
  return knex('users')
    .where('id', id)
    .update({
      is_disabled: disabled,
      updated_at: knex.raw('NOW()')
    })
}

function countAll () {
  return new Promise(function (resolve) {
    knex('users')
      .where('is_deleted', false)
      .count('id')
      .first()
      .then((count) => {
        resolve(parseInt(count.count))
      })
  })
}
