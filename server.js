const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const { authRouter, userRouter } = require('./routes/index')
const { PORT, DB_URL } = require('./config/config')
const { mainErrorHandler } = require('./utils')

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.use(mainErrorHandler)

const startServer = async () => {
	try {
		await mongoose
			.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
			.then(() => {
				console.log('DB successfully started')
			})
		app.listen(PORT, () =>
			console.log(`Server successfully started on ${PORT} port`)
		)
	} catch (e) {
		console.log('Server error', e.message)
	}
}

startServer()
