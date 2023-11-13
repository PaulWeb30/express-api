const { UserModel } = require('../models/index')

module.exports = {
	getAll: () => {
		return UserModel.find().select('-passwordHash')
	},
	getOneByParams: filter => {
		return UserModel.findOne(filter)
	},
	deleteUser: filter => {
		return UserModel.deleteOne(filter)
	},
	updateUserById: (userId, newObject) => {
		return UserModel.findOneAndUpdate({ _id: userId }, newObject, { new: true })
	},
}
