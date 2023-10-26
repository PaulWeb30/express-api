const getAccessToken = req => {
	return (req.headers.authorization || '').replace(/Bearer\s?/, '')
}

module.exports = getAccessToken