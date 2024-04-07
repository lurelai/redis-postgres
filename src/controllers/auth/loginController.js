'use strict';
const { loginService } = require('../../services/authService')

const loginController = async (req, res)=>{
	const { nickname, password } = req.body
	
	// Simple verify
	if(!nickname || !password)
		return res.send('Something is invalid')

	const { err, ok } = await loginService(nickname, password)

	if(err)
		return res.send(err)

	return res.send('okay')
}

module.exports = loginController

