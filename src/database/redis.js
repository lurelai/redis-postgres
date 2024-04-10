const { createClient } = require('redis')

// set dotenv
require('dotenv').config()

const { REDIS_USER, REDIS_PASSWORD, REDIS_URL, REDIS_PORT } = process.env

const client = createClient({
	url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_URL}:${REDIS_PORT}`
}).on('error', err => console.log("REDIS ERR: " + err))

const createConnection = async ()=>{
	try{
		const start = Date.now()
		await client.connect()
		const end = Date.now() - start

		return { connectionTime: end }
	}catch(err){
		console.log(err)
		return { err }
	}
}

module.exports = { createConnection }

