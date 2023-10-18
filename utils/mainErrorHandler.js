const { INTERNAL_SERVER_ERROR } = require('../constants/statusCodes')

module.exports = (err, req, res, next) => {
	res.status(err.status || INTERNAL_SERVER_ERROR).json({
		message: err.message || 'Server error',
		status: err.status || INTERNAL_SERVER_ERROR,
	})
}
