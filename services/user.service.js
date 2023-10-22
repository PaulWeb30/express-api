const { UserModel } = require('../models/index')

module.exports = {
	getAll: () => {
		return UserModel.find().select('-passwordHash')
	},
	getOneByParams: filter => {
		return UserModel.findOne(filter)
	},
	getOneById: id => {
		return UserModel.findById(id)
	},
	deleteUser: userId => {
		return UserModel.deleteOne({ _id: userId })
	},
	updateUser: (userId, newObject) => {
		return UserModel.updateOne({ _id: userId }, newObject, { new: true })
	},
}
