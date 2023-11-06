const express = require('express')

const AuthController = require('../controllers/auth.controller')
const {
	loginValidation,
	signupValidation,
	forgotPassEmailValidation,
	forgotPassNewPassValidation,
} = require('../validations/auth.validation')
const { tokenType } = require('../constants')

const { userMdlwr, commonMdlwr, authMdlwr } = require('../middlewares/index')

const router = express.Router()

router.post(
	'/login',
	commonMdlwr.checkIsBodyValid(loginValidation),
	userMdlwr.getUserDynamicaly('body', 'email', 'email'),
	AuthController.login
)
router.post(
	'/signup',
	commonMdlwr.checkIsBodyValid(signupValidation),
	userMdlwr.checkEmailUniqueness,
	AuthController.signup
)

router.post('/refresh', authMdlwr.checkIsRefreshToken, AuthController.refresh)

router.post('/logout', authMdlwr.checkIsAccessToken, AuthController.logout)

router.post(
	'/password/forgot',
	commonMdlwr.checkIsBodyValid(forgotPassEmailValidation),
	userMdlwr.getUserDynamicaly('body', 'email', 'email'),
	AuthController.forgotPassword
)

router.patch(
	'/password/forgot',
	commonMdlwr.checkIsBodyValid(forgotPassNewPassValidation),
	authMdlwr.checkIsActionToken(tokenType.FORGOT_PASS),
	AuthController.setNewPassword
)

router.get(
	'/email/verification/:userId/:token',
	commonMdlwr.checkIsIdValid('userId', 'params'),
	userMdlwr.getUserDynamicaly('params', 'userId', '_id'),
	authMdlwr.checkIsActionToken(tokenType.EMAIL_VERIF),
	AuthController.emailVerification
)

module.exports = router
