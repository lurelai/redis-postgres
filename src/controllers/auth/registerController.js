'use strict';
const { registerService } = require('../../services/authService')

const register = async (req, res)=>{
	const { name, password, nickname } = req.body

	// Simple verify
	if(!name || !password || !nickname)
		return res.send("Something is invalid")

	const result = await registerService(name, password, nickname)

	if(result.err){
		if(result.err === "Nickname already exists")
			return res.end("Nickname already exists")

		return res.send("WTF err")
	}

	return res.send("User created")
}

module.exports = register

