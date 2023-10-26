const { isObjectIdOrHexString } = require('mongoose')

const { validationResult } = require('express-validator')
const { BAD_REQUEST } = require('../constants/statusCodes')
const { ApiError } = require('../utils')

module.exports = {
	handleValidationErrors: (req, res, next) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				const errorMessages = errors
					.array()
					.map(error => error.msg)
					.join(', ')

				const errorMessage = `Validation failed: ${errorMessages}`

				return next(new ApiError(errorMessage, BAD_REQUEST))
			}

			next()
		} catch (e) {
			next(e)
		}
	},
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
}
