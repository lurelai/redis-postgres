require('dotenv').config()

const injectUsers = async ()=>{
	const err = {}

	console.time("Time to inject everything: ")

	for(let i = 0; i < 10000; i++){
		const result = await fetch("http://localhost:8080/auth/register", {
			method: 'post',
			headers: {
				'Content-Type': "application/json"
			},
			body: JSON.stringify({name: 'lucas', password: "noreal", nickname: "lucas"+i})
		})

		if(result.status !== 200)
			err[i] = { err: true, current: "lucas"+i }
	}

	console.timeEnd("Time to inject everything: ")
	console.log(err)
}

injectUsers()

