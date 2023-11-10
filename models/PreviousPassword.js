const { Schema, model } = require('mongoose')

const PreviousPasswordShema = new Schema(
	{
		password: { type: String, required: true },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('Previous_Password', PreviousPasswordShema)
