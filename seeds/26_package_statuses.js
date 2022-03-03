require('dotenv').config()

const { static: { packageStatuses } } = require('../lib/config')

exports.seed = async function (knex, Promise) {
  await knex.raw('SELECT setval(\'package_statuses_id_seq\', 3)')

  return knex('package_statuses').insert([
    {
      id: 1,
      name: packageStatuses.draft
    },
    {
      id: 2,
      name: packageStatuses.submitted
    },
    {
      id: 3,
      name: packageStatuses.approved
    }
  ])
}
