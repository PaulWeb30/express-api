const cron = require('node-cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

const { tokenService, previousPasswordService } = require('../services')
const { ApiError } = require('../utils')
const { constant, statusCodes } = require('../constants')

dayjs.extend(utc)

module.exports = () => {
	// Cron runs every Saturday at 4:00 AM.
	cron.schedule('0 4 * * 6', async () => {
		try {
			const twentyDaysAgo = dayjs().utc().subtract(20, 'd')

			const query = { createdAt: { $lt: twentyDaysAgo } }
			//delete auth tokens
			await tokenService.deleteMany(query)
			//delete action tokens
			await tokenService.deleteMany(query, constant.ACTION)
			//delete old previous passwords
			await previousPasswordService.deleteMany(query)
		} catch (e) {
			throw new ApiError(e.message, statusCodes.INTERNAL_SERVER_ERROR)
		}
	})
}
