const { query } = require('../database/db.js')

const registerService = async (name, password, nickname)=>{
	try{
		const queryString = "INSERT INTO users(name, password, nickname) VALUES($1, $2, $3)"
		const { queryTime } = await query(queryString, [name, password, nickname])

		console.log(`QUERY TIME: NAME: ${name}\\ NICKNAME ${nickname}\\ QTIME: ${queryTime}`)
		return { ok: 'User created', queryTime }
	}catch(err){
		if(err.code === "23505")
			return { err: "Nickname already exists" }

		return { err: err }
	}
}

module.exports = { registerService }

