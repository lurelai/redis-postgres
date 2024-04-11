const { query } = require('../database/db')
const { randomUUID } = require('node:crypto')


const getLoginSession = async (id)=>{
	const queryString = "SELECT user_id FROM sessions where user_id = $1"

	return null
}

module.exports = { getLoginSession }

