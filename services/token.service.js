const jwt = require('jsonwebtoken')

const {
	ACCESS_SECRET,
	REFRESH_SECRET,
	ACCESS_EXPIRES,
	REFRESH_EXPIRES,
} = require('../config/config')

const { AuthModel } = require('../models/index')
const { ApiError } = require('../utils/index')
const { statusCodes, constant } = require('../constants/index')

module.exports = {
	generateAuthTokens: payload => {
		const access_token = jwt.sign(payload, ACCESS_SECRET, {
			expiresIn: ACCESS_EXPIRES,
		})
		const refresh_token = jwt.sign(payload, REFRESH_SECRET, {
			expiresIn: REFRESH_EXPIRES,
		})

		return {
			access_token,
			refresh_token,
		}
	},
	saveAuthTokens: tokensObject => {
		return AuthModel.create(tokensObject)
	},
	deleteOneByParams: filter => {
		return AuthModel.deleteOne(filter)
	},
	getOneWithUser: filter => {
		return AuthModel.findOne(filter).populate('user')
	},
	getOne: filter => {
		return AuthModel.findOne(filter)
	},
	verifyAuthToken: (token, tokenType = constant.ACCESS) => {
		try {
			let secretWord

			if (tokenType === constant.ACCESS) secretWord = ACCESS_SECRET
			if (tokenType === constant.REFRESH) secretWord = REFRESH_SECRET

			return jwt.verify(token, secretWord)
		} catch (e) {
			throw new ApiError("Token ain't valid", statusCodes.UNAUTHORIZED)
		}
	},
}
