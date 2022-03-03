'use strict'

const path = require('path')
const mustache = require('mustache')
const fs = require('fs')

module.exports = {
  render
}

function getTemplatesDirectory () {
  return path.resolve(__dirname, '../templates')
}

function readTemplateFile (filename) {
  return fs.readFileSync(filename, 'utf-8')
}

/**
 * Render the template using mustache packjage
 * @param {string} templateFileName The filename of the template eg. filename.html. File must be located in libs/templates
 * @param {string} params Hash of the parameters to be replaced
 * @returns {string} Content
 */
async function render (templateFileName, params) {
  const templateFilename = path.resolve(getTemplatesDirectory(), templateFileName)
  const template = await readTemplateFile(templateFilename)

  return mustache.render(template, params)
}
