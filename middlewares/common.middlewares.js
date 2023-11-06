const { isObjectIdOrHexString } = require('mongoose')

const { BAD_REQUEST } = require('../constants/statusCodes')
const { ApiError } = require('../utils')

module.exports = {
	checkIsIdValid: (fieldName, from = 'params') => {
		return async (req, res, next) => {
			try {
				if (!isObjectIdOrHexString(req[from][fieldName])) {
					return next(new ApiError("User's id is not valid", BAD_REQUEST))
				}
				next()
			} catch (e) {
				next(e)
			}
		}
	},
	checkIsBodyValid: validatorType => {
		return async (req, res, next) => {
			try {
				const validate = validatorType.validate(req.body)

				if (validate.error) {
					return next(
						new ApiError(
							`Validation failed: ${validate.error.message}`,
							BAD_REQUEST
						)
					)
				}

				req.body = validate.value

				next()
			} catch (e) {
				next(e)
			}
		}
	},
}
