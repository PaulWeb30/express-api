const authService = require('../services/auth.service')
const tokenService = require('../services/token.service')

const { CREATED, OK } = require('../constants/statusCodes')

module.exports = {
	signup: async (req, res, next) => {
		try {
			const { password } = req.body

			const passWordHash = await authService.hashPassword(password)

			const user = await authService.signup({
				...req.body,
				hash: passWordHash,
			})

			const authTokens = tokenService.generateTokens({ _id: user._id })

			res.status(CREATED).json({
				...authTokens,
				user,
			})

			next()
		} catch (e) {
			next(e)
		}
	},
	login: async (req, res, next) => {
		try {
			const { password } = req.body
			const { passwordHash, _id } = req.user

			await authService.comparePasswords(password, passwordHash)

			const authTokens = tokenService.generateTokens({ _id })

			res.status(OK).json({
				...authTokens,
				user: req.user,
			})

			next()
		} catch (e) {
			next(e)
		}
	},
}
