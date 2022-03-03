'use strict'

const createRepositoryService = require('../repository')
const packageRepository = createRepositoryService('packages')
const { removeTimestamps } = require('../../helpers/transformer')
const { packageStatuses } = require('../../config').static
const {
  createPackagesSql,
  createClient,
  createPackage,
  bindBrandCategoriesToPackage,
  bindAssetToPackage,
  countAll,
  list,
  archive,
  restore,
  exportList,
  getPackageStatus,
  deletePackagesAssets,
  deletePackagesBrandCategories,
  updatePackages
} = require('./functions')
const clientRepository = require('../client')

module.exports = packageRepository

packageRepository.findByUserId = function (userId) {
  return this.findBy({
    user_id: userId
  })
}

packageRepository.findByReferenceId = function (referenceId) {
  return this.findBy({
    reference_id: referenceId
  })
}

packageRepository.findByName = function (name) {
  return this.findBy({
    name
  })
}

packageRepository.findById = function (id) {
  const connection = this.getConnection()
  const sql = createPackagesSql(connection.raw('WHERE packages.id=?', id).toString(), 'packages.created_at', '')
  return new Promise(function (resolve) {
    connection
      .raw(sql)
      .then(result => resolve(result.rowCount > 0 ? result.rows[0] : null))
  })
}

packageRepository.create = function (requestJson, user) {
  const {
    name,
    notes = '',
    brand_categories: brandCategoryIds,
    client: {
      company_name: companyName,
      firstname,
      lastname = '',
      agency_name: agencyName = ''
    },
    assets
  } = requestJson
  let createdPackage = null
  const knex = packageRepository.getConnection()

  return new Promise(function (resolve) {
    knex.transaction(function (trx) {
      clientRepository.setTransaction(trx)
      clientRepository
        .create(companyName, firstname, lastname, agencyName)
        .then(createClient(trx, packageStatuses.draft))
        .then(createPackage(trx, name, notes, user))
        .then(bindBrandCategoriesToPackage(trx, brandCategoryIds))
        .then(bindAssetToPackage(trx, assets))
        .then((result) => (createdPackage = removeTimestamps(result)))
        .then(trx.commit)
        .then(() => resolve(createdPackage))
    })
  })
}

packageRepository.list = function (ownerUserId, page, itemsPerPage, orderBy, search, archive) {
  let count
  let actualPageCount
  return new Promise((resolve, reject) => {
    countAll(packageRepository, ownerUserId, search, archive)
      .then((_countResult) => {
        count = parseInt(_countResult.count)
        actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
        page = page > actualPageCount ? actualPageCount : page
        return list(packageRepository, ownerUserId, page, itemsPerPage, orderBy, search, archive)
      })
      .then((_listResult) => resolve({
        paginate: {
          current: page,
          itemsPerPage,
          last: actualPageCount,
          count
        },
        rows: _listResult.rows
      }))
      .catch(err => reject(err))
  })
}

packageRepository.exportList = function (ownerUserId, page, itemsPerPage, orderBy, search) {
  let count
  let actualPageCount
  return new Promise((resolve, reject) => {
    countAll(packageRepository, ownerUserId, search)
      .then((_countResult) => {
        count = parseInt(_countResult.count)
        actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
        page = page > actualPageCount ? actualPageCount : page
        return exportList(packageRepository, ownerUserId, page, itemsPerPage, orderBy, search)
      })
      .then((_listResult) => resolve({
        paginate: {
          current: page,
          itemsPerPage,
          last: actualPageCount,
          count
        },
        rows: _listResult.rows
      }))
      .catch(err => reject(err))
  })
}

packageRepository.del = function (id) {
  return new Promise(function (resolve) {
    const knex = packageRepository.getConnection()
    knex.transaction(function (trx) {
      trx('packages_assets')
        .where('package_id', id)
        .delete()
        .then(() => {
          return trx('packages_brand_categories')
            .where('package_id', id)
            .delete()
        })
        .then(() => {
          return trx('packages')
            .where('id', id)
            .delete()
        })
        .then(trx.commit)
        .then(() => resolve())
    })
  })
}

packageRepository.update = function (id, clientId, requestJson, user) {
  const {
    name,
    notes = '',
    brand_categories: brandCategoryIds,
    client: {
      company_name: companyName,
      firstname,
      lastname = '',
      agency_name: agencyName = ''
    },
    assets
  } = requestJson
  let updatedPackage = null
  const knex = packageRepository.getConnection()

  return new Promise(function (resolve) {
    knex.transaction(function (trx) {
      clientRepository.setTransaction(trx)
      clientRepository
        .update(clientId, companyName, firstname, lastname, agencyName)
        .then(deletePackagesBrandCategories(trx, id))
        .then(deletePackagesAssets(trx, id))
        .then(updatePackages(trx, id, name, notes))
        .then(bindBrandCategoriesToPackage(trx, brandCategoryIds))
        .then(bindAssetToPackage(trx, assets))
        .then((result) => (updatedPackage = removeTimestamps(result)))
        .then(trx.commit)
        .then(() => resolve(updatedPackage))
    })
  })
}

packageRepository.submitUpdate = function (id, clientId, requestJson, user) {
  const {
    name,
    notes = '',
    brand_categories: brandCategoryIds,
    client: {
      company_name: companyName,
      firstname,
      lastname = '',
      agency_name: agencyName = ''
    },
    assets
  } = requestJson
  let updatedPackage = null
  let packageStatusSubmittedId = null
  const knex = packageRepository.getConnection()

  return new Promise(function (resolve) {
    knex.transaction(function (trx) {
      clientRepository.setTransaction(trx)
      clientRepository
        .update(clientId, companyName, firstname, lastname, agencyName)
        .then(deletePackagesBrandCategories(trx, id))
        .then(deletePackagesAssets(trx, id))
        .then(getPackageStatus(trx, packageStatuses.submitted))
        .then((packageStatus) => {
          packageStatusSubmittedId = packageStatus.id
          return updatePackages(trx, id, name, notes, packageStatusSubmittedId)()
        })
        .then(bindBrandCategoriesToPackage(trx, brandCategoryIds))
        .then(bindAssetToPackage(trx, assets))
        .then((result) => (updatedPackage = removeTimestamps(result)))
        .then(trx.commit)
        .then(() => resolve(updatedPackage))
    })
  })
}

packageRepository.submitNew = function (requestJson, user) {
  const {
    name,
    notes = '',
    brand_categories: brandCategoryIds,
    client: {
      company_name: companyName,
      firstname,
      lastname = '',
      agency_name: agencyName = ''
    },
    assets
  } = requestJson
  let createdPackage = null
  const knex = packageRepository.getConnection()

  return new Promise(function (resolve) {
    knex.transaction(function (trx) {
      clientRepository.setTransaction(trx)
      clientRepository
        .create(companyName, firstname, lastname, agencyName)
        .then(createClient(trx, packageStatuses.submitted))
        .then(createPackage(trx, name, notes, user))
        .then(bindBrandCategoriesToPackage(trx, brandCategoryIds))
        .then(bindAssetToPackage(trx, assets))
        .then((result) => (createdPackage = removeTimestamps(result)))
        .then(trx.commit)
        .then(() => resolve(createdPackage))
    })
  })
}

packageRepository.archive = archive

packageRepository.restore = restore

packageRepository.confirm = function (id, clientId, requestJson) {
  const {
    name,
    notes = '',
    brand_categories: brandCategoryIds,
    client: {
      company_name: companyName,
      firstname,
      lastname = '',
      agency_name: agencyName = ''
    },
    assets
  } = requestJson
  let updatedPackage = null
  let packageStatusApprovedId = null
  const knex = packageRepository.getConnection()

  return new Promise(function (resolve) {
    knex.transaction(function (trx) {
      clientRepository.setTransaction(trx)
      clientRepository
        .update(clientId, companyName, firstname, lastname, agencyName)
        .then(deletePackagesBrandCategories(trx, id))
        .then(deletePackagesAssets(trx, id))
        .then(getPackageStatus(trx, packageStatuses.approved))
        .then((packageStatus) => {
          packageStatusApprovedId = packageStatus.id
          return updatePackages(trx, id, name, notes, packageStatusApprovedId)()
        })
        .then(bindBrandCategoriesToPackage(trx, brandCategoryIds))
        .then(bindAssetToPackage(trx, assets))
        .then((result) => (updatedPackage = removeTimestamps(result)))
        .then(trx.commit)
        .then(() => resolve(updatedPackage))
    })
  })
}
