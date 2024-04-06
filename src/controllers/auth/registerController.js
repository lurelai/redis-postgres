'use strict';

const register = (req, res)=>{
	const { name, password } = req.body

	// Simple verify
	if(!name || !password)
		return res.send("Something is invalid")

	return res.send("Register controller")
}

module.exports = register

