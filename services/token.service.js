const jwt = require('jsonwebtoken')
const {
	ACCESS_SECRET,
	REFRESH_SECRET,
	ACCESS_EXPIRES,
	REFRESH_EXPIRES,
} = require('../config/config')

module.exports = {
	generateTokens: payload => {
		const accessToken = jwt.sign(payload, ACCESS_SECRET, {
			expiresIn: ACCESS_EXPIRES,
		})
		const refresh_token = jwt.sign(payload, REFRESH_SECRET, {
			expiresIn: REFRESH_EXPIRES,
		})

		return {
			accessToken,
			refresh_token,
		}
	},
}
