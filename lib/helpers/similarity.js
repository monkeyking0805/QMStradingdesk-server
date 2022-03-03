'use strict'

const debug = require('debug')('qms-tradingdesk-server:helpers:similarity')
const stringSimilarity = require('string-similarity')
/*
  @matchedResult: For return similarity by findBestMatch
  @source: Source for Input,
  @arrayItemList: array item list for return extact item
*/
const processSimilarity = (fieldName, matchedResult, source, arrayItemList) => {
  debug(processSimilarity.name)
  source = source.trim()
  if (matchedResult.bestMatch.rating === 1) {
    return {
      source,
      [fieldName]: arrayItemList[matchedResult.bestMatchIndex]
    }
  } else {
    if (matchedResult.bestMatch.rating > 0.8) {
      return {
        source,
        recommend: true,
        [fieldName]: arrayItemList[matchedResult.bestMatchIndex]
      }
    } else {
      return {
        source,
        isNotfound: true
      }
    }
  }
}

const processBestMatch = (item, arraySearchItem) => {
  debug(processBestMatch.name)
  return stringSimilarity.findBestMatch(item, arraySearchItem)
}

module.exports = {
  processSimilarity,
  processBestMatch
}
