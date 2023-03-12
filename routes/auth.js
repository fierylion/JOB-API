const express = require('express')

const router = express.Router()
//controllers
const {login, registerUser}  = require('../controllers/auth')

//routes
router.route('/register').post(registerUser)
router.route('/login').post(login)

module.exports = router
