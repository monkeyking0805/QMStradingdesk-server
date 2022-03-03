'use strict'

const createRepositoryService = require('./repository')
const clientRepository = createRepositoryService('clients')

clientRepository.create = function (companyName, firstname, lastname, agencyName) {
  return clientRepository.getConnection()('clients')
    .insert({
      company_name: companyName,
      firstname,
      lastname,
      agency_name: agencyName
    })
    .returning('*')
}

clientRepository.update = function (id, companyName, firstname, lastname, agencyName) {
  return clientRepository.getConnection()('clients')
    .where('id', id)
    .update({
      company_name: companyName,
      firstname,
      lastname,
      agency_name: agencyName
    })
    .returning('*')
}

module.exports = clientRepository
