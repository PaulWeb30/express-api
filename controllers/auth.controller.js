const authService = require('../services/auth.service')
const tokenService = require('../services/token.service')

const { CREATED, OK } = require('../constants/statusCodes')

module.exports = {
	signup: async (req, res, next) => {
		try {
			const { user } = await authService.signup(req.body)

			const tokens = tokenService.generateTokens({ _id: user._id })

			res.status(CREATED).json({
				tokens,
				user,
			})

			next()
		} catch (e) {
			next(e)
		}
	},
	login: async (req, res, next) => {
		try {
			const { email, password } = req.body
			const { user } = await authService.login(email, password)

			const tokens = tokenService.generateTokens({ _id: user._id })

			res.status(OK).json({
				tokens,
				user,
			})

			next()
		} catch (e) {
			next(e)
		}
	},
}
