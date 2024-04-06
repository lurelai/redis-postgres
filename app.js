const express = require('express')
const app = express()

// set database connection
const { postgresConnection } = require('./src/database/db')
postgresConnection()

app.get('/', (req, res)=>{
	return res.send('Ola Mundo')
})

app.listen(8000)

