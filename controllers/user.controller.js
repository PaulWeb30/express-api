const userService = require('../services/user.service')
const { statusCodes } = require('../constants')

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const users = await userService.getAll()

			res.status(statusCodes.OK).json(users)
		} catch (e) {
			next(e)
		}
	},
	getOne: async (req, res, next) => {
		try {
			const user = req.user

			res.status(statusCodes.OK).json(user)
		} catch (e) {
			next(e)
		}
	},
	update: async (req, res, next) => {
		try {
			const { userId } = req.params

			const user = await userService.updateUserById(userId, req.body)

			res.status(statusCodes.OK).json(user)
		} catch (e) {
			next(e)
		}
	},
	delete: async (req, res, next) => {
		try {
			const { userId } = req.params

			await userService.deleteUser({ _id: userId })

			res.status(statusCodes.OK).json({ userId })
		} catch (e) {
			next(e)
		}
	},
}
