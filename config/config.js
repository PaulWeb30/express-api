module.exports = {
	PORT: process.env.PORT || 5555,
	DB_URL: process.env.DB_URL,
	BASE_URL: process.env.BASE_URL,
	ACCESS_SECRET: process.env.ACCESS_SECRET,
	REFRESH_SECRET: process.env.REFRESH_SECRET,
	ACCESS_EXPIRES: process.env.ACCESS_EXPIRES || '15m',
	REFRESH_EXPIRES: process.env.REFRESH_EXPIRES || '30d',
	NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
	NO_REPLY_PASS: process.env.NO_REPLY_PASS,
	FRONTEND_URL: process.env.FRONTEND_URL || 'example.com',
	FORGOT_PASS_TOKEN_SECRET: process.env.FORGOT_PASS_TOKEN_SECRET,
	EMAIL_VERIF_TOKEN_SECRET: process.env.EMAIL_VERIF_TOKEN_SECRET,
}
