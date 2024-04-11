const { query } = require('../database/db')
const { getLoginSession } = require('./loginSession')

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

const loginService = async (nickname, password)=>{
	try{
		const queryString = "SELECT nickname, password, user_id FROM users WHERE nickname=$1"
		const { result, queryTime } = await query(queryString, [nickname])

		if(result.rows.length === 0)
			return { err: "invalid nickname" }

		if(result.rows.length > 1)
			return { err: "there's some err in your database, please, check it again" }

		if(result.rows[0].password !== password)
			return { err: "invalid password" }

		console.log(`QUERY TIME: NICKNAME: ${nickname}\\ QTIME: ${queryTime}`)

		const { session, where } = await getLoginSession(result.rows[0].user_id)
		console.log(where, session, 'session')

		return { ok: 'okay' }
	}catch(err){
		console.log(err)
		
		return { err: 'WTF ERR' }
	}
}

module.exports = { registerService, loginService }

