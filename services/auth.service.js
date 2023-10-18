const bcrypt = require('bcrypt')

const { ApiError } = require('../utils')
const { UserModel } = require('../models/index')
const {
	UNAUTHORIZED,
	CONFLICT,
	NOT_FOUND,
} = require('../constants/statusCodes')

module.exports = {
	signup: async body => {
		const password = body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const newUser = new UserModel({
			email: body.email,
			fullName: body.fullName,
			passwordHash: hash,
			avatarUrl: body.avatarUrl,
		})

		const user = await newUser.save()

		const { passwordHash, ...otherUserData } = user._doc

		return {
			user: otherUserData,
		}
	},
	login: async (email, password) => {
		const user = await UserModel.findOne({ email })

		if (!user) {
			throw new ApiError('User not found', NOT_FOUND)
		}

		const isValidPass = await bcrypt.compare(password, user._doc.passwordHash)

		if (!isValidPass) {
			throw new ApiError('Wrong login or password', UNAUTHORIZED)
		}

		const { passwordHash, ...otherUserData } = user._doc

		return {
			user: otherUserData,
		}
	},
}
