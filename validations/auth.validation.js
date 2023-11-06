const Joi = require('joi')
const { ApiError } = require('../utils')
const { statusCodes } = require('../constants')

const emailField = Joi.string()
	.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
	.lowercase()
	.trim()
	.error(new ApiError('Invalid email', statusCodes.BAD_REQUEST))

const passwordField = Joi.string()
	.regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
	.error(new ApiError('Invalid password', statusCodes.BAD_REQUEST))

const fullNameField = Joi.string()
	.alphanum()
	.min(3)
	.max(30)
	.error(new ApiError('Invalid fullname', statusCodes.BAD_REQUEST))

const loginValidation = Joi.object({
	email: emailField.required(),
	password: passwordField.required(),
})
const signupValidation = Joi.object({
	email: emailField.required(),
	password: passwordField.required(),
	fullName: fullNameField.required(),
})

const forgotPassEmailValidation = Joi.object({
	email: emailField.required(),
})

const forgotPassNewPassValidation = Joi.object({
	password: passwordField.required(),
})

const updateUserValidation = Joi.object({
	email: emailField.required(),
	fullName: fullNameField.required(),
})

module.exports = {
	signupValidation,
	loginValidation,
	forgotPassEmailValidation,
	forgotPassNewPassValidation,
	updateUserValidation,
}
