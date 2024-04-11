const Redis = require('ioredis')

// dotenv
require('dotenv').config()

const { REDIS_USER, REDIS_PASSWORD, REDIS_URL, REDIS_PORT } = process.env

console.time("Redis connection time")
const redis = new Redis({
	username: REDIS_USER,
	password: REDIS_PASSWORD,
	host: REDIS_URL,
	port: REDIS_PORT
})
console.timeEnd("Redis connection time")

const functions = {
	set: async (key, value)=>{
		return await redis.set(key, value)
	},

	get: async (key, value)=>{
		return await redis.get(key)
	}
}

const { set, get } = functions

module.exports = { set, get, redis }


