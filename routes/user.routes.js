const express = require('express')

const UserController = require('../controllers/user.controller')
const { signupValidation } = require('../validations/auth.validation')

const { userMdlwr, commonMdlwr, authMdlwr } = require('../middlewares/index')

const router = express.Router()

router.get('/', UserController.getAll)
router.get(
	'/:userId',
	commonMdlwr.checkIsIdValid('userId'),
	userMdlwr.getUserDynamicaly('params', 'userId', '_id'),
	UserController.getOne
)
router.patch(
	'/:userId',
	commonMdlwr.checkIsIdValid('userId'),
	signupValidation,
	commonMdlwr.handleValidationErrors,
	userMdlwr.getUserDynamicaly('params', 'userId', '_id'),
	userMdlwr.checkEmailUniqueness,
	authMdlwr.checkIsAccessToken,
	UserController.update
)
router.delete(
	'/:userId',
	commonMdlwr.checkIsIdValid('userId'),
	userMdlwr.getUserDynamicaly('params', 'userId', '_id'),
	UserController.delete
)

module.exports = router
