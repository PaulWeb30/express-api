const { AuthModel, ActionToken } = require('../models')
const constant = require('./constant')

module.exports = {
	[constant.AUTH]: AuthModel,
	[constant.ACTION]: ActionToken,
}
