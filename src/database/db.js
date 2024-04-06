const Pool = require('pg-pool')
const { readFileSync } = require('node:fs')
const { join } = require('path')

// Config dotenv
require('dotenv').config()


const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DATABASE,
	host: process.env.POSTGRES_HOST,
})

// Create table if not exists
pool.query(readFileSync(join(__dirname, 'create-table.sql'), 'ASCII'))

const postgresConnection = async ()=>{
	try{
		const start = Date.now()
		await pool.connect()
		const end = Date.now()

		return { connectionTime: end - start }
	}catch(err){
		return { err }
	}
}

const query = async (q, params)=>{
	return await pool.query(q, param)
}

module.exports = { postgresConnection }

