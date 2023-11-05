const nodemailer = require('nodeMailer')
const EmailTemplates = require('email-templates')
const path = require('path')

const { FRONTEND_URL } = require('../config/config')
const { NO_REPLY_EMAIL, NO_REPLY_PASS } = require('../config/config')
const emailTemplatesObj = require('../email-templates')

module.exports = {
	sendEmail: async (userEmail, emailAction, locals = {}) => {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: NO_REPLY_EMAIL,
				pass: NO_REPLY_PASS,
			},
		})

		const emailInfo = emailTemplatesObj[emailAction]

		const templateParser = new EmailTemplates({
			views: { root: path.join(process.cwd(), 'email-templates') },
		})

		const html = await templateParser.render(emailInfo.templateName, {
			...locals,
			frontendUrl: FRONTEND_URL,
		})

		return transporter.sendMail({
			from: 'No reply',
			to: userEmail,
			subject: emailInfo.subject,
			html,
		})
	},
}
