'use strict'

const debug = require('debug')('qms-tradingdesk-server:controllers:packages')
const error = require('debug')('qms-tradingdesk-server:controllers:packages:error')
const packageRepository = require('../repositories/package')
const {
  env: { clientBaseUrl, email: { scheduleConfirmedAddress } },
  static: { roleKeys, packageListOrderByColumns, packageStatuses, clientRequestPaths }
} = require('../config')
const packageViewTransformer = require('../transformers/packages/view')
const packageConfirmedEmailTransformer = require('../transformers/packages/scheduleConfirmed')
const paginateHelper = require('../helpers/paginate')
const userRepository = require('../repositories/user')
const { removeTimestamps } = require('../helpers/transformer')
const { databaseErrorHandling } = require('../helpers/databaseErrorHandling')
const {
  sendScheduleSubmittedEmail,
  sendScheduleConfirmedEmail
} = require('../helpers/email')
const url = require('url')
const prefixErrorMessage = 'Archive'

module.exports = {
  create,
  list,
  view,
  del,
  update,
  submitUpdate,
  submitNew,
  confirm,
  archive,
  restore
}

async function create (ctx) {
  debug(create.name)
  try {
    const result = await packageRepository.create(ctx.request.body, ctx.state.user)
    const pkg = (await packageRepository.findById(result.id))
    ctx.created(packageViewTransformer.transform(pkg))
  } catch (err) {
    error(create.name, err)
    err.expose = true
    throw err
  }
}

function getListParameters (ctx) {
  const { page, itemsPerPage } = paginateHelper.getUrlParameters(ctx)
  const { order_by: orderBy, search, archive } = ctx.request.query

  return {
    page,
    itemsPerPage,
    orderBy,
    search,
    archive
  }
}

async function list (ctx) {
  debug(list.name)
  try {
    const { user } = ctx.state
    const isAdmin = user.role.key === roleKeys.admin
    const {
      page,
      orderBy,
      search,
      archive,
      itemsPerPage
    } = getListParameters(ctx)
    const result = await packageRepository.list(isAdmin ? 0 : user.id, page, itemsPerPage, packageListOrderByColumns[orderBy], search, archive)
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

async function view (ctx, next) {
  debug(view.name)

  try {
    const { user } = ctx.state
    const { id } = ctx.params
    const pkg = (await packageRepository.findById(id))

    if (!pkg) {
      ctx.notFound()
    }

    if (!user.isAdmin() && (pkg.user_id !== user.id)) {
      ctx.forbidden()
    }
    ctx.ok(packageViewTransformer.transform(pkg))
  } catch (err) {
    error(view.name, err)
    err.expose = true
    throw err
  }
}

async function del (ctx, next) {
  debug(del.name)

  try {
    const { user } = ctx.state
    const { id } = ctx.params
    const pkg = (await packageRepository.findById(id))

    if (!pkg) {
      ctx.notFound()
    }

    if (!user.isAdmin()) {
      if (pkg.user_id !== user.id) {
        ctx.forbidden()
      } else if (pkg.status === packageStatuses.approved) {
        ctx.conflict()
      }
    }

    await packageRepository.del(id)

    ctx.ok()
  } catch (err) {
    error(del.name, err)
    err.expose = true
    throw err
  }
}

async function update (ctx) {
  debug(update.name)

  const { id } = ctx.params
  const { user, package: { client: { id: clientId } } } = ctx.state

  try {
    const result = await packageRepository.update(id, clientId, ctx.request.body, user)
    const pkg = (await packageRepository.findById(result.id))
    ctx.ok(packageViewTransformer.transform(pkg))
  } catch (err) {
    error(update.name, err)
    err.expose = true
    throw err
  }
}

async function getAllAdminCsvEmails () {
  const admins = await userRepository.findAllAdmins()
  return admins.map((user) => user.email).join(',')
}

async function sendScheduleSubmittedNotification (pkg) {
  const csvEmails = await getAllAdminCsvEmails()
  const brandCategories = pkg.brand_categories.map(category => category.name).join(', ')
  await sendScheduleSubmittedEmail(csvEmails, {
    booking_name: pkg.name,
    client_name: pkg.client.company_name,
    agency_name: pkg.client.agency_name || '',
    brand_categories: brandCategories,
    user_firstname: pkg.user.firstname,
    user_lastname: pkg.user.lastname || '',
    notes: pkg.notes || '',
    link: url.resolve(clientBaseUrl, clientRequestPaths.packageView(pkg.id))
  })
}

async function sendScheduleConfirmedNotification (pkg) {
  const csvEmails = scheduleConfirmedAddress
  await sendScheduleConfirmedEmail(csvEmails, packageConfirmedEmailTransformer.transform(pkg))
}

async function submitUpdate (ctx) {
  debug(submitUpdate.name)

  const { id } = ctx.params
  const { package: { client: { id: clientId } } } = ctx.state

  try {
    const result = await packageRepository.submitUpdate(id, clientId, ctx.request.body)
    const pkg = (await packageRepository.findById(result.id))
    await sendScheduleSubmittedNotification(pkg)
    ctx.ok(packageViewTransformer.transform(pkg))
  } catch (err) {
    error(submitUpdate.name, err)
    err.expose = true
    throw err
  }
}

async function submitNew (ctx) {
  debug(submitNew.name)
  try {
    const result = await packageRepository.submitNew(ctx.request.body, ctx.state.user)
    const pkg = (await packageRepository.findById(result.id))
    await sendScheduleSubmittedNotification(pkg)
    ctx.created(packageViewTransformer.transform(pkg))
  } catch (err) {
    error(submitNew.name, err)
    err.expose = true
    throw err
  }
}

async function confirm (ctx) {
  debug(confirm.name)

  const { id } = ctx.params
  const { user, package: { client: { id: clientId } } } = ctx.state

  try {
    const result = await packageRepository.confirm(id, clientId, ctx.request.body, user)
    const pkg = (await packageRepository.findById(result.id))
    await sendScheduleConfirmedNotification(pkg)
    ctx.ok(packageViewTransformer.transform(pkg))
  } catch (err) {
    error(confirm.name, err)
    err.expose = true
    throw err
  }
}

async function archive (ctx, next) {
  try {
    const result = await packageRepository.archive(ctx.request.body.id)
    ctx.ok(removeTimestamps(result))
  } catch (err) {
    error(update.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}

async function restore (ctx, next) {
  try {
    const result = await packageRepository.restore(ctx.request.body.id)
    ctx.ok(removeTimestamps(result))
  } catch (err) {
    error(update.name, err)
    databaseErrorHandling(err, prefixErrorMessage)
    err.status = err.hasOwnProperty('status') ? err.status : 500
    throw err
  }
}
