'use strict';

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

// set dotenv
require('dotenv').config()


// set redis connection
require('./src/database/redis')


// set postgres connection
const { postgresConnection } = require('./src/database/db')
postgresConnection().then(msg=>{
	if(msg.err)
		return console.log(msg.err)

	console.log("Postgresql connection time: " + msg.connectionTime+"ms")
})


// App defaults
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))


// Routes
require('./src/routes/authRoute')(app)
require('./src/routes/userRoute')(app)

app.get('/', async (req, res)=>{
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

