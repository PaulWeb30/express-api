module.exports = {
	PORT: process.env.PORT || 5555,
	DB_URL: process.env.DB_URL,
	ACCESS_SECRET: process.env.ACCESS_SECRET,
	REFRESH_SECRET: process.env.REFRESH_SECRET,
	ACCESS_EXPIRES: process.env.ACCESS_EXPIRES || '15m',
	REFRESH_EXPIRES: process.env.REFRESH_EXPIRES || '30d',
}
