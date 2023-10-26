const { constant, statusCodes } = require('../constants')

const { ApiError } = require('../utils')

const { tokenService } = require('../services')

module.exports = {
	checkIsAccessToken: async (req, res, next) => {
		try {
			const access_token = req.get(constant.AUTHORIZATION)

			if (!access_token) {
				return next(new ApiError('No token', statusCodes.UNAUTHORIZED))
			}

			tokenService.verifyAuthToken(access_token)

			const tokenInfo = await tokenService.getOneWithUser({ access_token })

			if (!tokenInfo) {
				return next(new ApiError('Token aint found', statusCodes.UNAUTHORIZED))
			}

			req.tokenInfo = tokenInfo
			next()
		} catch (e) {
			next(e)
		}
	},
	checkIsRefreshToken: async (req, res, next) => {
		try {
			const refresh_token = req.get(constant.AUTHORIZATION)

			if (!refresh_token) {
				return next(new ApiError('No token', statusCodes.UNAUTHORIZED))
			}

			tokenService.verifyAuthToken(refresh_token, constant.REFRESH)

			const tokenInfo = await tokenService.getOne({ refresh_token })

			if (!tokenInfo) {
				return next(new ApiError('Token aint found', statusCodes.UNAUTHORIZED))
			}

			req.tokenInfo = tokenInfo
			next()
		} catch (e) {
			next(e)
		}
	},
}
