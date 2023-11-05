const express = require('express')

const AuthController = require('../controllers/auth.controller')
const {
	loginValidation,
	signupValidation,
} = require('../validations/auth.validation')
const { tokenType } = require('../constants')

const { userMdlwr, commonMdlwr, authMdlwr } = require('../middlewares/index')

const router = express.Router()

router.post(
	'/login',
	loginValidation,
	commonMdlwr.handleValidationErrors,
	userMdlwr.getUserDynamicaly('body', 'email', 'email'),
	AuthController.login
)
router.post(
	'/signup',
	signupValidation,
	commonMdlwr.handleValidationErrors,
	userMdlwr.checkEmailUniqueness,
	AuthController.signup
)

router.post('/refresh', authMdlwr.checkIsRefreshToken, AuthController.refresh)

router.post('/logout', authMdlwr.checkIsAccessToken, AuthController.logout)

router.patch('/email/verification', AuthController.emailVerification)

router.post(
	'/password/forgot',
	userMdlwr.getUserDynamicaly('body', 'email', 'email'),
	AuthController.forgotPassword
)

router.patch(
	'/password/forgot',
	authMdlwr.checkIsActionToken(tokenType.FORGOT_PASS),
	AuthController.setNewPassword
)

module.exports = router
