'use strict'

const debug = require('debug')('qms-tradingdesk-server:controller:admin:users')
const error = require('debug')('qms-tradingdesk-server:controller:admin:users:error')
const config = require('../../config')
const roleKeys = config.static.roleKeys
const knex = require('../../db')
const auth = require('../../helpers/auth')
const userRepository = require('../../repositories/user')
const httpStatus = config.http
const roleRepository = require('../../repositories/role')
const UserStatuses = require('../../enums/UserStatuses')
const { removeTimestamps } = require('../../helpers/transformer')
const {
  static: { userListOrderByColumns, userUpdatableColumns },
  error: { format: formatJsonResponse },
  http: { messages: { setPassword: { successful: setPasswordSuccessful } } }
} = config
const paginateHelper = require('../../helpers/paginate')
module.exports = {
  createUser,
  list,
  edit,
  view,
  del,
  setEnabled,
  setPassword
}

async function createUser (ctx, next) {
  debug(createUser.name)

  const { email, password, firstname, lastname, country, region, timezone, language, phone } = ctx.request.body
  let { role } = ctx.request.body

  try {
    let newUserId = 0
    await knex.transaction(function (trx) {
      knex('users')
        .returning('id')
        .insert({
          email: email.toLowerCase(),
          firstname,
          lastname,
          password: auth.encryptPassword(password),
          country_id: country,
          region_id: region,
          timezone_id: timezone,
          language_id: language,
          phone
        })
        .transacting(trx)
        .then(async insertedIds => {
          newUserId = insertedIds[0]

          if (!role) {
            const roleData = await roleRepository.findByKey(roleKeys.sales).first()
            role = roleData.id
          }

          return userRepository.setRole(newUserId, role, trx)
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

    const newUser = removeTimestamps(await userRepository.find(newUserId))
    ctx.created(newUser)
  } catch (err) {
    error(createUser, err)
    err.expose = true
    err.status = err.hasOwnProperty('status') ? err.status : 500

    throw err
  }
}

async function list (ctx, next) {
  debug(list.name)
  const { page, itemsPerPage, orderBy } = getListParameters(ctx)
  const orderByColumns = userListOrderByColumns[orderBy]

  try {
    const count = await userRepository.countAll()
    const actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
    const _page = page > actualPageCount ? actualPageCount : page
    const users = removeTimestamps(await userRepository.list(_page, itemsPerPage, orderByColumns))
    const result = {
      paginate: {
        current: _page,
        itemsPerPage,
        last: actualPageCount,
        count
      },
      rows: users
    }
    ctx.ok({
      ...result,
      parameters: ctx.request.query
    })
  } catch (err) {
    error(list.name, err)
    err.expose = true
    throw err
  }
}

async function validateUserIdParam (ctx) {
  const { id } = ctx.params

  if (!id || !/^(\d+)$/.test(id) || (id < 1)) {
    ctx.throw(httpStatus.clientError.badRequest, httpStatus.messages.invalidUrlParameter)
  }

  const user = await userRepository.find(id)

  if (!user) {
    ctx.throw(httpStatus.clientError.notFound, httpStatus.messages.notFound)
  }

  return user
}

function getUpdateParameters (ctx) {
  const result = {}
  const targetUserId = parseInt(ctx.params.id)
  const isMe = ctx.state.user.isMyId(targetUserId)
  for (const column in userUpdatableColumns) {
    if (ctx.request.body.hasOwnProperty(column)) {
      result[userUpdatableColumns[column]] = ctx.request.body[column]
    }
  }
  if (result.hasOwnProperty('is_disabled')) {
    if (typeof result.is_disabled === 'string') {
      result.is_disabled = result.is_disabled.trim()
      result.is_disabled = result.is_disabled === 'true' || result.is_disabled === '1'
    } else if (result.is_disabled) {
      result.is_disabled = true
    } else {
      result.is_disabled = false
    }

    // Current Admin should not be able to disable self
    if (isMe && result.is_disabled) {
      delete result.is_disabled
    }
  }
  return result
}

function getNewRoleIdForUpdate (ctx, user) {
  const role = ctx.request.body.role || ''
  const newRoleId = parseInt(role)

  // Since only admin can change user role
  // If target user is self, not allowed to change the role
  // Because admin should not change self into sales
  return (!ctx.state.user.isMyId(user.id)) && (newRoleId !== user.role.id) ? newRoleId : false
}

async function edit (ctx, next) {
  debug(edit.name)

  try {
    const user = await validateUserIdParam(ctx)
    const id = parseInt(ctx.params.id)
    const updateParameters = getUpdateParameters(ctx)
    const newRoleId = getNewRoleIdForUpdate(ctx, user)

    await userRepository.update(id, updateParameters, newRoleId)

    ctx.ok(removeTimestamps(await userRepository.find(id)))
  } catch (err) {
    error(edit.name, err)
    err.expose = true
    throw err
  }
}

async function view (ctx, next) {
  debug(view.name)
  try {
    const user = removeTimestamps(await validateUserIdParam(ctx))
    ctx.ok(user)
  } catch (err) {
    error(view.name, err)
    err.expose = true
    throw err
  }
}

async function validateDelete (ctx) {
  const toBeDeletedUser = await validateUserIdParam(ctx)

  if (ctx.state.user.isMyId(toBeDeletedUser.id)) {
    ctx.badRequest(config.error.validation.cannotDeleteSelf)
  }

  return toBeDeletedUser
}

async function del (ctx) {
  debug(del.name)
  try {
    const toBeDeletedUser = await validateDelete(ctx)
    await userRepository.del(toBeDeletedUser.id)
    ctx.ok()
  } catch (err) {
    error(del.name, err)
    err.expose = true
    throw err
  }
}

async function validateSetEnabled (ctx) {
  const toBeDisabledUser = await validateUserIdParam(ctx)

  if (ctx.state.user.isMyId(toBeDisabledUser.id)) {
    ctx.badRequest(config.error.validation.cannotDisableSelf)
  }

  return toBeDisabledUser
}

async function setEnabled (ctx) {
  debug(setEnabled.name)
  try {
    const toBeDeletedUser = await validateSetEnabled(ctx)
    const { status } = ctx.request.body
    const disabled = status === UserStatuses.disabled

    await userRepository.disable(toBeDeletedUser.id, disabled)

    ctx.ok()
  } catch (err) {
    error(setEnabled.name, err)
    err.expose = true
    throw err
  }
}

function getListParameters (ctx) {
  const { page, itemsPerPage } = paginateHelper.getUrlParameters(ctx)
  const { order_by: orderBy } = ctx.request.query

  return {
    page,
    itemsPerPage,
    orderBy
  }
}

async function setPassword (ctx) {
  debug(setPassword.name)

  try {
    const user = removeTimestamps(await validateUserIdParam(ctx))
    const { newpassword } = ctx.request.body
    const updateParameters = {
      password: auth.encryptPassword(newpassword)
    }

    await userRepository.update(user.id, updateParameters)

    ctx.ok(formatJsonResponse(config.http.successful.ok, setPasswordSuccessful))
  } catch (err) {
    error(setPassword.name, err)
    err.expose = true
    throw err
  }
}
