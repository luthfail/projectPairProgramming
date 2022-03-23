const express = require('express');
const router = express.Router()
const user = require('./user');
const admin = require('./admin');
const Controller = require('../controllers/home');

router.get('/', Controller.login) //!Home Page

router.get('/register/add', Controller.formRegist) //!Home Page
router.post('/register/add', Controller.addRegist) //!Home Page

router.use('/', user)
router.use('/', admin)


module.exports = router