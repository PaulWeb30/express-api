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
		avatarUrl: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('User', UserSchema)
