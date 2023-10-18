const { body } = require('express-validator')

const signupValidation = [
	body('email', 'Invalid email').isEmail(),
	body('password', 'Invalid password').isLength({ min: 5 }),
	body('fullName', 'Invalid fullname').isLength({ min: 3 }),
	body('avatarUrl', 'Invalid avatar').optional().isURL(),
]

const loginValidation = [
	body('email', 'Invalid email').isEmail(),
	body('password', 'Invalid password').isLength({ min: 5 }),
]

module.exports = {
	signupValidation,
	loginValidation,
}
