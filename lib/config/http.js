'use strict'

module.exports = {
  successful: {
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204
  },
  clientError: {
    badRequest: 400,
    unauthroized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    gone: 410,
    iAmATeapot: 418
  },
  serverError: {
    internal: 500,
    notImplemented: 501
  },
  messages: {
    notFound: 'Your request have no result',
    invalidUrlParameter: 'Your requested URL is invalid',
    ok: 'OK',
    created: 'CREATED',
    accountIsDisabled: 'Your account is disabled',
    passwordReset: {
      emailIsSent: 'Password reset instruction has been sent to the requested email address',
      succuessfullyReset: 'Your password has been reset successfully'
    },
    emailUpdate: {
      emailIsSent: 'Email changing confirmation has been sent to the new email address',
      succuessfullyChanged: 'Your email has been updated successfully'
    },
    setPassword: {
      successful: 'You have changed password successfully'
    }
  }
}
