const { Schema, model } = require('mongoose')

const ActionTokenShema = new Schema(
	{
		token: { type: String, required: true },
		tokenType: { type: String },
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

module.exports = model('Action_Token', ActionTokenShema)
