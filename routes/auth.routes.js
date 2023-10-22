const express = require('express')

const AuthController = require('../controllers/auth.controller')
const {
	loginValidation,
	signupValidation,
} = require('../validations/auth.validation')

const { userMdlwr, commonMdlwr } = require('../middlewares/index')

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

module.exports = router
