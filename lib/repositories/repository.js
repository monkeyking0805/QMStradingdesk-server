'use strict'
const debug = require('debug')('qms-tradingdesk-server:repositories')
const knex = require('../db')

module.exports = createRepositoryService

/**
 * Create repository service with basic functionality to access data
 * @param {string} tableName Name of the database table this repository service will be bound to
 */
function createRepositoryService (tableName) {
  let _trx = null

  return {
    /**
     * Return all data
     */
    all: function () {
      debug(this.all.name)
      return this.getConnection()(tableName)
    },
    /**
     * Find the data using specified criteria
     * @param {object} criteria hash of criteria using hash jey as column name ex. { id: 1, status: 'active' }
     */
    findBy: function (criteria) {
      debug(this.findBy.name)
      return this.getConnection()(tableName)
        .where(criteria)
    },
    /**
     * Find the data by id
     * @param {integer} id
     */
    findById: function (id) {
      debug(this.findById.name)
      return this.findBy({ id }).first()
    },
    /**
     * Check if the data specified in criteria exists in table
     * @param {object} criteria hash of criteria using hash jey as column name ex. { id: 1, status: 'active' }
     * @return {boolean} True, If the data specified in criteria exists in table
     */
    isExists: function (id) {
      return new Promise((resolve) => {
        const sql = `SELECT EXISTS(SELECT id FROM ${tableName} WHERE id=? LIMIT 1)`
        this.getConnection()
          .raw(sql, [id])
          .then((result) => resolve(result.rows[0].exists))
      })
    },
    /**
     * Set transaction object to be used with this repository
     */
    setTransaction: function (trx) {
      _trx = trx
    },
    /**
     * If in transaction process and not completed, return transaction object instead
     */
    getConnection: function () {
      return (_trx && !_trx.isCompleted) ? _trx : knex
    },
    getTableName: function () {
      return tableName
    },
    createLimitStatement: function (page, itemsPerPage) {
      return `LIMIT ${itemsPerPage} OFFSET ${itemsPerPage} * ${page - 1}`
    }
  }
}
