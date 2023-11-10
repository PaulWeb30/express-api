const jwt = require('jsonwebtoken')

const {
	ACCESS_SECRET,
	REFRESH_SECRET,
	ACCESS_EXPIRES,
	REFRESH_EXPIRES,
	FORGOT_PASS_TOKEN_SECRET,
} = require('../config/config')

const { ApiError } = require('../utils/index')
const { statusCodes, modelType, tokenType, constant } = require('../constants')

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
	generateActionToken: (typeOfToken, payload) => {
		return jwt.sign(payload, FORGOT_PASS_TOKEN_SECRET, {
			expiresIn: '1d',
		})
	},
	saveTokens: (tokensObject, modelName = constant.AUTH) => {
		const model = modelType[modelName]

		if (!model) {
			throw new ApiError('Model not found', statusCodes.INTERNAL_SERVER_ERROR)
		}
		return model.create(tokensObject)
	},
	deleteOneByParams: (filter, modelName = constant.AUTH) => {
		const model = modelType[modelName]

		if (!model) {
			throw new ApiError('Model not found', statusCodes.INTERNAL_SERVER_ERROR)
		}

		return model.deleteOne(filter)
	},
	deleteMany: (filter, modelName = constant.AUTH) => {
		const model = modelType[modelName]

		if (!model) {
			throw new ApiError('Model nof found', statusCodes.INTERNAL_SERVER_ERROR)
		}

		return model.deleteMany(filter)
	},
	getOneWithUser: (filter, modelName = constant.AUTH) => {
		const model = modelType[modelName]

		if (!model) {
			throw new ApiError('Model nof found', statusCodes.INTERNAL_SERVER_ERROR)
		}
		return model.findOne(filter).populate('user')
	},
	getOne: (filter, modelName = constant.AUTH) => {
		const model = modelType[modelName]

		if (!model) {
			throw new ApiError('Model nof found', statusCodes.INTERNAL_SERVER_ERROR)
		}
		return model.findOne(filter)
	},
	verifyToken: (token, typeOfToken = tokenType.ACCESS) => {
		try {
			let secretWord = REFRESH_SECRET

			switch (typeOfToken) {
				case tokenType.ACCESS:
					secretWord = ACCESS_SECRET
					break
				case tokenType.REFRESH:
					secretWord = REFRESH_SECRET
					break
				case tokenType.FORGOT_PASS:
					secretWord = FORGOT_PASS_TOKEN_SECRET
					break
				case tokenType.EMAIL_VERIF:
					secretWord = FORGOT_PASS_TOKEN_SECRET
					break
				default:
					throw new ApiError('Token type not found', statusCodes.UNAUTHORIZED)
			}

			return jwt.verify(token, secretWord)
		} catch (e) {
			throw new ApiError("Token ain't valid", statusCodes.UNAUTHORIZED)
		}
	},
}
