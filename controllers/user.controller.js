//TODO Make users controllers
module.exports = {
	getAll: () => {},
	update: (req, res, next) => {
		try {
			const { userId } = req.params
			console.log(id)
			res.json(2)
			next()
		} catch (e) {
			next(e)
		}
	},
	delete: (req, res, next) => {
		try {
			const { userId } = req.params
			console.log(id)
			res.json(2)
			next()
		} catch (e) {
			next(e)
		}
	},
}
