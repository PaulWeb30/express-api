const { UserModel } = require('../models/')
const {
	authService,
	tokenService,
	userService,
	emailService,
	previousPasswordService,
} = require('../services/index')
const {
	statusCodes,
	emailAction,
	tokenType,
	constant,
} = require('../constants')
const { FRONTEND_URL, BASE_URL } = require('../config/config')

module.exports = {
	signup: async (req, res, next) => {
		try {
			const { email } = req.body

			const user = await UserModel.createUserWithHashPassword(req.body)

			const authTokens = tokenService.generateAuthTokens({ _id: user._id })

			const action_token = tokenService.generateActionToken(
				tokenType.EMAIL_VERIF,
				{ _id: user._id }
			)

			await tokenService.saveTokens(
				{
					token: action_token,
					tokenType: tokenType.EMAIL_VERIF,
					user: user._id,
				},
				constant.ACTION
			)

			const url = `${BASE_URL}/auth/email/verification/${user._id}/${action_token}`
			await emailService.sendEmail(email, emailAction.EMAIL_VERIFICATION, {
				url,
			})

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
			const { _id } = req.user

			await req.user.isPasswordsSame(password)

			const authTokens = tokenService.generateAuthTokens({ _id })

			await tokenService.saveTokens({ ...authTokens, user: _id })

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

			await tokenService.saveTokens({ ...authTokens, user })

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

			res.status(statusCodes.OK).json('success')
		} catch (e) {
			next(e)
		}
	},
	emailVerification: async (req, res, next) => {
		try {
			const { user } = req.tokenInfo

			await userService.updateUserById(user._id, { verified: true })

			res.status(statusCodes.OK).json('Email was successfull verified!')
		} catch (e) {
			next(e)
		}
	},
	forgotPassword: async (req, res, next) => {
		try {
			const { email, _id } = req.user

			const action_token = tokenService.generateActionToken(
				tokenType.FORGOT_PASS,
				{ _id }
			)

			await tokenService.saveTokens(
				{ token: action_token, tokenType: tokenType.FORGOT_PASS, user: _id },
				constant.ACTION
			)

			const url = `${FRONTEND_URL}/password/forgot?token=${action_token}`
			await emailService.sendEmail(email, emailAction.FORGOT_PASS, { url })

			res.status(statusCodes.OK).json('success')
		} catch (e) {
			next(e)
		}
	},
	setNewPassword: async (req, res, next) => {
		try {
			const { password } = req.body
			const { user, token } = req.tokenInfo

			const passwordHash = await authService.hashPassword(password)
			await userService.updateUserById(user._id, { passwordHash })

			await previousPasswordService.create({
				password: user.passwordHash,
				user: user._id,
			})

			await await tokenService.deleteMany({ user: user._id }, constant.AUTH)
			await tokenService.deleteOneByParams({ token }, constant.ACTION)

			res.status(statusCodes.OK).json('success')
		} catch (e) {
			next(e)
		}
	},
	changePassword: async (req, res, next) => {
		try {
			const { password } = req.body
			const { user } = req.tokenInfo

			const passwordHash = await authService.hashPassword(password)
			await userService.updateUserById(user._id, { passwordHash })

			await previousPasswordService.create({
				password: user.passwordHash,
				user: user._id,
			})

			await tokenService.deleteMany({ user: user._id }, constant.AUTH)

			res.status(statusCodes.OK).json('success')
		} catch (e) {
			next(e)
		}
	},
}
