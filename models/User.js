const { Schema, model } = require('mongoose')

const authService = require('../services/auth.service')

const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		avatarUrl: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

UserSchema.statics = {
	async createUserWithHashPassword(userObject) {
		const passwordHash = await authService.hashPassword(userObject.password)

		return this.create({
			...userObject,
			passwordHash,
		})
	},
}

UserSchema.methods = {
	async isPasswordsSame(password) {
		await authService.comparePasswords(password, this.passwordHash)
	},
}

module.exports = model('User', UserSchema)
