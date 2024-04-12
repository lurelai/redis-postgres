'use strict';
const { loginService } = require('../../services/authService')

const loginController = async (req, res)=>{
	const { nickname, password } = req.body
	
	// Simple verify
	if(!nickname || !password)
		return res.send('Something is invalid')

	const { err, ok, session } = await loginService(nickname, password)

	if(err)
		return res.send(err)

	// setting a cookie
	res.cookie("session", session, { httpOnly: true, secure: true, signed: true })

	return res.redirect("/user/")
}

module.exports = loginController

