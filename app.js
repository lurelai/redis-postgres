const express = require('express')
const app = express()

app.get('/', (req, res)=>{
	return res.send('Ola Mundo')
})

app.listen(8000)

