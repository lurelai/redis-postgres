const express = require('express')
const app = express()

// set database connection
const { postgresConnection } = require('./src/database/db')
postgresConnection().then(msg=>{
	if(msg.err)
		return console.log(msg.err)

	console.log("Postgresql connection time: " + msg.connectionTime+"ms")
})

app.get('/', (req, res)=>{
	return res.send('Ola Mundo')
})

app.listen(8000)

