const router = require('express').Router()

const loggedController = require('../controllers/user/loggedController')

router.get('/', loggedController)

module.exports = app=>app.use('/user', router)

