require('dotenv').config()

const a = fetch(`localhost:${process.env.APP_PORT_CONTAINER}/auth/register`, {method: 'post'}).then(e=>{
	console.log(e)
})

