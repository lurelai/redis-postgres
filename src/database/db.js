const Pool = require('pg-pool')

// Config dotenv
require('dotenv').config()


const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DATABASE,
	host: process.env.POSTGRES_HOST,
})

const postgresConnection = async ()=>{
	try{
		await pool.connect()

		console.log('okay')
	}catch(err){
		console.log(err)
		
	}
}

module.exports = { postgresConnection }

