'use strict'
const createRepositoryService = require('../repository')
const exclusionRepository = createRepositoryService('exclusions')
const getExclusionsByParams = require('./getExclusionsByParams')
const {
  createConditionStatement,
  createSelectExclusionSql,
  countAll,
  all,
  insertRelatedExclusions,
  deleteRelatedExclusions
} = require('./functions')
const { error: { sql: { db: dbError } } } = require('../../config')

module.exports = {
  ...exclusionRepository,
  findById,
  list,
  getExclusionsByParams,
  create,
  update,
  del
}

function findById (id) {
  const connection = exclusionRepository.getConnection()
  const sql = createSelectExclusionSql(createConditionStatement({
    exclusion: id
  }))
  return new Promise(function (resolve, reject) {
    connection
      .raw(sql)
      .then((result) => resolve(result.rowCount ? result.rows[0] : null))
      .catch((err) => {
        if (err.hasOwnProperty('code') && err.hasOwnProperty('table')) {
          const error = new Error(dbError)
          error.status = 500
          error.message = dbError
          error.inner = err
          reject(error)
        } else {
          reject(err)
        }
      })
  })
}

function list (brandCategories, brands, codeTypes, codes, clubs, venues, assetTypes, page, itemsPerPage) {
  let count
  let actualPageCount
  return new Promise((resolve, reject) => {
    const conditions = {
      brandCategories,
      brands,
      codeTypes,
      codes,
      clubs,
      venues,
      assetTypes
    }
    countAll(conditions)
      .then((_countResult) => {
        count = parseInt(_countResult.count)
        actualPageCount = (count === 0) ? 1 : Math.ceil(count / itemsPerPage)
        page = page > actualPageCount ? actualPageCount : page
        return all(conditions, page, itemsPerPage)
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
      .catch((err) => {
        if (err.hasOwnProperty('code') && err.hasOwnProperty('table')) {
          const error = new Error(dbError)
          error.status = 500
          error.message = dbError
          error.inner = err
          reject(error)
        } else {
          reject(err)
        }
      })
  })
}

function create (requestJson) {
  const {
    note
  } = requestJson
  const knex = exclusionRepository.getConnection()
  let createdExlusion
  return new Promise(function (resolve, reject) {
    knex.transaction(function (trx) {
      trx('exclusions')
        .returning('*')
        .insert({ note })
        .then(([newExclusion]) => {
          createdExlusion = newExclusion
          return insertRelatedExclusions(createdExlusion.id, requestJson, trx)
        })
        .then(trx.commit)
        .then(() => resolve(createdExlusion))
        .catch((err) => {
          if (err.hasOwnProperty('code') && err.hasOwnProperty('table')) {
            const error = new Error(dbError)
            error.status = 500
            error.message = dbError
            error.inner = err
            reject(error)
          } else {
            reject(err)
          }
        })
    })
  })
}

function update (exclusionId, requestJson) {
  const {
    note
  } = requestJson
  const knex = exclusionRepository.getConnection()
  return new Promise(function (resolve, reject) {
    knex.transaction(function (trx) {
      deleteRelatedExclusions(exclusionId, trx)
        .then(() => insertRelatedExclusions(exclusionId, requestJson, trx))
        .then(() => trx('exclusions').returning('*').where('id', exclusionId).update({ note }))
        .then(trx.commit)
        .then(resolve)
        .catch((err) => {
          if (err.hasOwnProperty('code') && err.hasOwnProperty('table')) {
            const error = new Error(dbError)
            error.status = 500
            error.message = dbError
            error.inner = err
            reject(error)
          } else {
            reject(err)
          }
        })
    })
  })
}

function del (exclusionId) {
  const knex = exclusionRepository.getConnection()
  return new Promise(function (resolve, reject) {
    knex.transaction(function (trx) {
      deleteRelatedExclusions(exclusionId, trx)
        .then(() => trx('exclusions').where('id', exclusionId).del())
        .then(trx.commit)
        .then(resolve)
        .catch((err) => {
          if (err.hasOwnProperty('code') && err.hasOwnProperty('table')) {
            const error = new Error(dbError)
            error.status = 500
            error.message = dbError
            error.inner = err
            reject(error)
          } else {
            reject(err)
          }
        })
    })
  })
}
