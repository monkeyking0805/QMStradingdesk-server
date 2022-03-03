'use strict'

const createRepositoryService = require('./repository')
const regionRepository = createRepositoryService('regions')

module.exports = regionRepository

regionRepository.findByCountryId = function (countryId) {
  return this.findBy({
    country_id: countryId
  })
}
