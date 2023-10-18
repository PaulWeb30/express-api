const jwt = require('jsonwebtoken')
const { ACCESS_SECRET, REFRESH_SECRET } = require('../config/config')

module.exports = {
	generateTokens: payload => {
		return {
			accessToken: jwt.sign(payload, ACCESS_SECRET, {
				expiresIn: '15m',
			}),
			refreshToken: jwt.sign(payload, REFRESH_SECRET, {
				expiresIn: '30d',
			}),
		}
	},
}
