const bcrypt = require('bcrypt')

const { ApiError } = require('../utils')
const { UserModel } = require('../models/index')
const { UNAUTHORIZED } = require('../constants/statusCodes')

module.exports = {
	signup: async body => {
		const { email, fullName, hash, avatarUrl } = body

		const newUser = new UserModel({
			email,
			fullName,
			passwordHash: hash,
			avatarUrl,
		})

		const user = await newUser.save()

		const { passwordHash, ...otherUserData } = user._doc

		return otherUserData
	},
	hashPassword: async password => {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		return hash
	},
	comparePasswords: async (password, passWordHash) => {
		const isValidPass = await bcrypt.compare(password, passWordHash)

		if (!isValidPass) {
			throw new ApiError('Wrong login or password', UNAUTHORIZED)
		}
	},
}
