const { UserModel } = require('../models/index')

module.exports = {
	getAll: ({ skipAmount, pageSize }) => {
		return UserModel.find()
			.skip(skipAmount)
			.limit(pageSize)
			.select('-passwordHash')
			.exec()
	},
	getOneByParams: filter => {
		return UserModel.findOne(filter).select('-passwordHash')
	},
	deleteUser: filter => {
		return UserModel.deleteOne(filter)
	},
	updateUserById: (userId, newObject) => {
		return UserModel.findOneAndUpdate({ _id: userId }, newObject, { new: true })
	},
}
