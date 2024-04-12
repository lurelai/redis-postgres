const { query } = require('../database/db')
const { hget, sessionHset } = require('../database/redis')
const { randomUUID } = require('node:crypto')


const getLoginSession = async (id)=>{
	const redisResult = await hget(`session:${id}`, "session_id")

	// verify if exists any session in the redis
	if(redisResult !== null)
		return { session: redisResult, where: 'redis' }


	// If there's nothing on the redis do everything bellow
	const querysString = {
		insert: "INSERT INTO sessions(session_id, user_id) VALUES($1, $2)",
		select: "SELECT session_id FROM sessions where user_id = $1"
	}

	// default return and the query's result
	toReturn = { session: randomUUID(), where: 'postgres (first time)' }
	const { result } = await query(querysString.select, [id])

	// verify if already exists any session, if there's, just set the "toReturn" as that
	if(result.rows.length !== 0)
		toReturn = { session: result.rows[0].session_id, where: 'postgres (already exists)' }
	
	// if not, create a new session in the database (the "toReturn" will be the default)
	else
		await query(querysString.insert, [toReturn.session, id])

	sessionHset(`session:${id}`, [["session_id", toReturn.session]])
	return toReturn
}

module.exports = { getLoginSession }

