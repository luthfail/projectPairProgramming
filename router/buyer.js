const express = require('express');
const router = express.Router()
const Controller = require('../controllers/buyer');

router.get('/product', Controller.showProduct) //! show product

router.get('/product/:id/wallet', Controller.topUp)
router.post('/product/:id/wallet', Controller.addTopUp)

router.get('/product/buy/:productId', Controller.buyProduct) //! buying product




module.exports = router