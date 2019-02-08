const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')
const sgMail = require('@sendgrid/mail')

const corsHandler = cors({ origin: true })

admin.initializeApp()

exports.addAdminRole = functions.https.onCall(async ({ email }) => {
  try {
    const user = await admin.auth().getUserByEmail(email)
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    })

    return { message: `Success! ${email} has been made an admin` }
  } catch (err) {
    console.log(JSON.stringify(err, null, 2))
    return { error: err.message }
  }
})

exports.sendEmail = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      sgMail.setApiKey(functions.config().sendgrid.key)

      const { to, subject, text } = req.body

      if (!to || !subject || !text) {
        res.status(400).send({
          message: 'Error: required field missing',
        })
      }

      const msg = {
        to,
        from: functions.config().sendgrid.email,
        subject,
        text,
      }

      await sgMail.send(msg)
      res.status(200).send({
        message: 'Email successfully sent',
      })
    } catch (err) {
      res.status(406).send({
        message: `Error: ${err.message}`,
      })
    }
  })
})
