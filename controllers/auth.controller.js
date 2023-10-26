const { authService, tokenService, userService } = require('../services/index')
const { statusCodes } = require('../constants')

module.exports = {
	signup: async (req, res, next) => {
		try {
			const { password } = req.body

			const passwordHash = await authService.hashPassword(password)

			const user = await userService.createUser({
				...req.body,
				passwordHash,
			})

			const authTokens = tokenService.generateAuthTokens({ _id: user._id })

			res.status(statusCodes.CREATED).json({
				...authTokens,
				user,
			})
		} catch (e) {
			next(e)
		}
	},
	login: async (req, res, next) => {
		try {
			const { password } = req.body
			const { passwordHash, _id } = req.user

			await authService.comparePasswords(password, passwordHash)

			const authTokens = tokenService.generateAuthTokens({ _id })

			await tokenService.saveAuthTokens({ ...authTokens, user: _id })

			res.status(statusCodes.OK).json({
				...authTokens,
				user: req.user,
			})
		} catch (e) {
			next(e)
		}
	},
	refresh: async (req, res, next) => {
		try {
			// user here means USER-ID without .populate('user') from DB
			const { user, refresh_token } = req.tokenInfo

			await tokenService.deleteOneByParams({ refresh_token })

			const authTokens = tokenService.generateAuthTokens({ _id: user })

			await tokenService.saveAuthTokens({ ...authTokens, user })

			res.status(statusCodes.OK).json({
				...authTokens,
			})
		} catch (e) {
			next(e)
		}
	},
	logout: async (req, res, next) => {
		try {
			const { user, access_token } = req.tokenInfo

			await tokenService.deleteOneByParams({ user: user._id, access_token })

			res.status(statusCodes.NO_CONTENT).json('success')
		} catch (e) {
			next(e)
		}
	},
}
