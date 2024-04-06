'use strict';

const router = require('express').Router()

const registerController = require('../controllers/auth/registerController')

router.post('/register', registerController)

module.exports = app=>app.use('/auth', router)

