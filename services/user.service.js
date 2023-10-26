const { UserModel } = require('../models/index')

module.exports = {
	createUser: userObject => {
		return UserModel.create(userObject)
	},
	getAll: () => {
		return UserModel.find().select('-passwordHash')
	},
	getOneByParams: filter => {
		return UserModel.findOne(filter)
	},
	getOneById: id => {
		return UserModel.findById(id)
	},
	deleteUser: filter => {
		return UserModel.deleteOne(filter)
	},
	updateUser: (userId, newObject) => {
		return UserModel.findOneAndUpdate({ _id: userId }, newObject, { new: true })
	},
}
