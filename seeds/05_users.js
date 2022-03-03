const auth = require('../lib/helpers/auth')

exports.seed = async function (knex, Promise) {
  // Manipulate sequence to be synced with manually seed data
  await knex.raw('SELECT setval(\'users_id_seq\', 2)')
  await knex.raw('SELECT setval(\'users_roles_id_seq\', 2)')

  await knex('users').insert([
    {
      id: 1,
      email: 'admin@gomeeki.com',
      password: auth.encryptPassword('12345678'),
      firstname: 'Administrator',
      language_id: 1,
      timezone_id: 1
    },
    {
      id: 2,
      email: 'sales@gomeeki.com',
      password: auth.encryptPassword('12345678'),
      firstname: 'Salesperson',
      language_id: 1,
      timezone_id: 1
    }
  ])

  return knex('users_roles').insert([
    {
      user_id: 1,
      role_id: 1
    },
    {
      user_id: 2,
      role_id: 2
    }
  ])
}
