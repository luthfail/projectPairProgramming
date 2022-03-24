const express = require('express')
const router = express.Router()
const buyer = require('./buyer');
const seller = require('./seller');
const Controller = require('../controllers/controller')

// router.get('/', Controller.forwarding)
// router.get("/home", Controller.home)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.registered)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.logedIn)
router.get('/logout', Controller.logout)
router.get('/', Controller.home)

router.use('/buyer', buyer)
router.use('/seller', seller)

module.exports = router;