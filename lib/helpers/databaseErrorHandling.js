const databaseErrorHandling = (error, prefixMessage) => {
  if (error.code) {
    // Following all code can read more at
    // https://www.postgresql.org/docs/9.6/errcodes-appendix.html
    switch (error.code) {
      case '23505': {
        error.status = 409
        error.message = `${prefixMessage} already exists`
        break
      }
      case '23503': {
        error.status = 500
        error.message = 'Deletion failed! A value can not be deleted if other elements are linked to it. Please remove any linked elements first before continuing.'
        break
      }
    }
  }
}

module.exports = {
  databaseErrorHandling
}
