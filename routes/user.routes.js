const express = require('express')

const UserController = require('../controllers/user.controller')
const { signupValidation } = require('../validations/auth.validation')

const { userMdlwr, commonMdlwr } = require('../middlewares/index')

const router = express.Router()

router.get('/getAll', UserController.getAll)
router.patch(
	'/update/:userId',
	commonMdlwr.checkIsIdValid('userId'),
	userMdlwr.checkUserExistence,
	UserController.update
)
router.delete(
	'/delete/:userId',
	commonMdlwr.checkIsIdValid('userId'),
	userMdlwr.checkUserExistence,
	UserController.delete
)

module.exports = router
