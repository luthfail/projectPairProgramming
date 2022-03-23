const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.forwarding)
router.get("/home", Controller.home)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.registered)
router.get('/login', Controller.loginForm)

module.exports = router;