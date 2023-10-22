const userService = require('../services/user.service')
const { OK } = require('../constants/statusCodes')
module.exports = {
	getAll: async (req, res, next) => {
		try {
			const users = await userService.getAll()

			res.status(OK).json(users)
			next()
		} catch (e) {
			next(e)
		}
	},
	getOne: async (req, res, next) => {
		try {
			const user = req.user
			res.status(OK).json(user)
			next()
		} catch (e) {
			next(e)
		}
	},
	update: async (req, res, next) => {
		try {
			const { userId } = req.params

			const user = await userService.updateUser(userId, req.body)

			res.status(OK).json(user)
			next()
		} catch (e) {
			next(e)
		}
	},
	delete: async (req, res, next) => {
		try {
			const { userId } = req.params

			await userService.deleteUser(userId)

			res.status(OK).json({ userId })
			next()
		} catch (e) {
			next(e)
		}
	},
}
