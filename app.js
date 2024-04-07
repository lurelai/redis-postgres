'use strict';

const express = require('express')
const app = express()

// set database connection
const { postgresConnection } = require('./src/database/db')
postgresConnection().then(msg=>{
	if(msg.err)
		return console.log(msg.err)

	console.log("Postgresql connection time: " + msg.connectionTime+"ms")
})


app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routes
require('./src/routes/authRoute')(app)

app.get('/', (req, res)=>{
	return res.send(`
		<h1>REGISTER SINGLE USER</h1>
		<form action="/auth/register" method="post">
			<input type="text" name="name" placeholder="User name">
			<input type="text" name="nickname" placeholder="User nickname">
			<input type="password" name="password" placeholder="User password">
			<input type="submit">
		</form>

		<h1>LOGIN SINGLE USER</h1>
		<form action="/auth/login" method="post">
			<input type="text" name="nickname" placeholder="User nickname">
			<input type="password" name="password" placeholder="User password">
			<input type="submit">
		</form>
	`)
})

app.listen(8000)

