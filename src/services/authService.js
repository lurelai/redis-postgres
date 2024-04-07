const { query } = require('../database/db.js')

const registerService = async (name, password, nickname)=>{
	try{
		const queryString = "INSERT INTO users(name, password, nickname) VALUES($1, $2, $3)"
		await query(queryString, [name, password, nickname])

		return { ok: 'User created' }
	}catch(err){
		if(err.code === "23505")
			return { err: "Nickname already exists" }

		return { err: err }
	}
}

module.exports = { registerService }

