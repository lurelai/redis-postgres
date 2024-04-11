const { query } = require('../database/db')
const { hget, sessionHset } = require('../database/redis')
const { randomUUID } = require('node:crypto')


const getLoginSession = async (id)=>{
	const querysString = [
		"SELECT user_id",
		"SELECT session_id FROM sessions where user_id = $1",
		"INSERT INTO sessions(session_id, user_id) VALUES($1, $2)"
	]

	const redisResult = await hget(`session:${id}`, "session_id")

	// verify if exists any session in the redis
	if(redisResult === null){
		const { result } = await query(querysString[1], [id])
		const session = randomUUID()

		// set a session in the redis
		sessionHset(`session:${id}`, [["session_id", session]])


		// verify if already exists any session, if there's, join in this if
		if(result.rows.length !== 0)
			return { session, where: 'postgres (already exists)' }

		// if not, create a new and return it's session
		await query(querysString[2], [session, id])
		return { session, where: 'postgres (never exists before)' }
	}

	return { session: null, where: 'redis?' }
}

module.exports = { getLoginSession }

