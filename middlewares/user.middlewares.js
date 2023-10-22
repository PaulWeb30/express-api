const userService = require('../services/user.service')
const { ApiError } = require('../utils')
const { CONFLICT, NOT_FOUND } = require('../constants/statusCodes')

module.exports = {
	checkEmailUniqueness: async (req, res, next) => {
		try {
			const { email } = req.body
			const { userId } = req.params

			const isCurrentUser = await userService.getOneByParams({ email })

			if (isCurrentUser && isCurrentUser._id.toString() !== userId) {
				return next(
					new ApiError('User with this E-Mail already exists', CONFLICT)
				)
			}

			next()
		} catch (e) {
			next(e)
		}
	},
	checkUserExistence: async (req, res, next) => {
		try {
			const { userId } = req.params

			const user = await userService.getOneById(userId)

			if (!user) {
				return next(new ApiError('User not found', NOT_FOUND))
			}

			req.user = user

			next()
		} catch (e) {
			next(e)
		}
	},
	getUserDynamicaly: (
		from = 'body',
		fieldName = 'userId',
		dbField = fieldName
	) => {
		return async (req, res, next) => {
			try {
				const fieldToSearch = req[from][fieldName]

				const user = await userService.getOneByParams({
					[dbField]: fieldToSearch,
				})

				if (!user) {
					return next(new ApiError('User not found', NOT_FOUND))
				}

				req.user = user

				next()
			} catch (e) {
				next(e)
			}
		}
	},
}
