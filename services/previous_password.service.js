const { Previous_Password } = require('../models/index')

module.exports = {
	create: filter => {
		return Previous_Password.create(filter)
	},
	getAll: filter => {
		return Previous_Password.find(filter).lean()
	},
	deleteMany: filter => {
		return Previous_Password.deleteMany(filter)
	},
}
