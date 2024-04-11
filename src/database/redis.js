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

	hget: async (key, field)=>{
		return await redis.hget(key, field)
	},

	sessionHset: async (key, fieldsValues)=>{
		return await redis.hset(key, fieldsValues[0][0], fieldsValues[0][1])
	}
}

const { set, hget, sessionHset } = functions

module.exports = { set, hget, sessionHset, redis }


