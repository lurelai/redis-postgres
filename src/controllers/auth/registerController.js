'use strict';
const { registerService } = require('../../services/authService')

const register = async (req, res)=>{
	const { name, password, nickname } = req.body
	console.log(name, password, nickname)

	// Simple verify
	if(!name || !password || !nickname)
		return res.send("Something is invalid").status(400)

	const result = await registerService(name, password, nickname)

	if(result.err){
		if(result.err === "Nickname already exists")
			console.log('no')
			return res.send("Nickname already exists").status(400)

		console.log(result.err)
		return res.send("WTF err").status(401)
	}

	return res.send("User created, please, go to <a href='/'>home</a> and loggin").status(200)
}

module.exports = register

