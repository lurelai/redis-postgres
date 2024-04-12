const loggedController = (req, res)=>{
	const { session } = req.signedCookies

	if(!session)
		return res.redirect('/')

	return res.send('Welcome')
}

module.exports = loggedController

