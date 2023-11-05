const { Schema, model } = require('mongoose')

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
		emailIsVerified: {
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

module.exports = model('User', UserSchema)
