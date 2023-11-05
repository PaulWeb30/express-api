const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const allRoutes = require('./routes')
const { PORT, DB_URL } = require('./config/config')
const { mainErrorHandler } = require('./utils')

const app = express()

app.use(express.json())

app.use('/api', allRoutes)

app.use(mainErrorHandler)

const startServer = async () => {
	try {
		await mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('DB successfully started')
		app.listen(PORT, () =>
			console.log(`Server successfully started on ${PORT} port`)
		)
	} catch (e) {
		console.error('Server error', e.message)
	}
}

startServer()
