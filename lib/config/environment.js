'use strict'

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'production',
  port: +process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    age: process.env.JWT_AGE_MIN || 60
  },
  db: {
    pool: {
      min: +process.env.SQL_POOL_MIN || 2,
      max: +process.env.SQL_POOL_MAX || 10
    },
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PWD,
    database: process.env.SQL_DATABASE
  },
  appKey: process.env.APP_KEY || 'default app key please change this',
  email: {
    mandrillApiKey: process.env.MANDRILL_API_KEY,
    senderAddress: process.env.SYSTEM_EMAIL_ADDRESS,
    senderName: process.env.SYSTEM_EMAIL_SENDER_NAME,
    scheduleConfirmedAddress: process.env.SCHEDULE_CONFIRMED_NOTIFY_EMAIL
  },
  clientBaseUrl: process.env.CLIENT_BASE_URL || 'http://pleasechangeme/',
  passwordReset: {
    tokenAge: process.env.PASSWORD_RESET_TOKEN_AGE_MIN || 60
  },
  emailUpdate: {
    tokenAge: process.env.EMAIL_UPDATE_TOKEN_AGE_MIN || 60
  },
  cache: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379',
    expire: process.env.REDIS_CACHE_EXPIRE || 700
  }
}
