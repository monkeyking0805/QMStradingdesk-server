'use strict'

module.exports = {
  transform,
  transformSingle
}

function transform (result) {
  return result.map(transformSingle)
}

function transformSingle (result) {
  const { assetunit, assettype, _event, codetype, ...rest } = result
  return {
    ...rest,
    assetUnit: assetunit,
    assetType: assettype,
    codeType: codetype,
    event: _event
  }
}
