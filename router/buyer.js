const express = require('express');
const router = express.Router()
const Controller = require('../controllers/buyer');

router.get('/product', Controller.showProduct) //! show product

module.exports = router