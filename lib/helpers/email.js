'use strict'

const debug = require('debug')('qms-tradingdesk-server:helpers:email')
const errorDebug = require('debug')('qms-tradingdesk-server:helpers:email:error')
const config = require('../config')
const { email: emailConfig } = config.env
const { email: { scheduleSubmitted, scheduleConfirmed } } = config.static
const nodemailer = require('nodemailer')
const mandrillTransport = require('nodemailer-mandrill-transport')
const { render: renderTemplate } = require('./template')

module.exports = {
  send,
  sendScheduleSubmittedEmail,
  sendScheduleConfirmedEmail
}

/**
 * Send an email via Mandrill service
 * @param {string} to Can be used in 2 formats: 1. email@domain.com 2. 'Sender name <email@domain.com>'
 * @param {string} subject Email subject
 * @param {string} bodyHtml Email body in HTML
 */
function send (to, subject, html) {
  debug(send.name)

  return new Promise(function (resolve, reject) {
    try {
      const smtpTransport = nodemailer.createTransport(mandrillTransport({
        auth: {
          apiKey: emailConfig.mandrillApiKey
        }
      }))

      const from = emailConfig.senderName ? `${emailConfig.senderName} <${emailConfig.senderAddress}>` : emailConfig.senderAddress

      const email = {
        from,
        to,
        subject,
        html
      }

      smtpTransport.sendMail(email, function (error, response) {
        if (error) {
          errorDebug(send.name, `Error in sending email: ${error.message}`)
        }
        resolve(response)
      })
    } catch (err) {
      errorDebug(send.name, err)
      reject(err)
    }
  })
}

async function sendScheduleSubmittedEmail (csvEmails, data) {
  const emailBodyHtml = await renderTemplate('scheduleSubmitted.html', data)
  return send(csvEmails, scheduleSubmitted.subject(data.booking_name), emailBodyHtml)
}

async function sendScheduleConfirmedEmail (csvEmails, data) {
  const emailBodyHtml = await renderTemplate('scheduleConfirmed.html', data)
  return send(csvEmails, scheduleConfirmed.subject(data.bookingName), emailBodyHtml)
}
