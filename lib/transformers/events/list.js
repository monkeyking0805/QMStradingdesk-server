'use strict'

module.exports = {
  transform,
  transformSingle
}

function transformSingle (row) {
  const {
    start_date: startDate,
    end_date: endDate,
    is_fta: isFta,
    is_ppv: isPpv,
    codetype: codeType,
    ...rest
  } = row
  return {
    ...rest,
    startDate,
    endDate,
    isFta,
    isPpv,
    codeType
  }
}

function transform (rows) {
  return rows.map((row) => transformSingle(row))
}
