const bcrypt = require('bcrypt')

const { ApiError } = require('../utils')
const { UNAUTHORIZED } = require('../constants/statusCodes')

module.exports = {
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
