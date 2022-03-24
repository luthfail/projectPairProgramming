const express = require('express');
const router = express.Router()
const Controller = require('../controllers/buyer');

router.get('buyer/product', Controller.showProduct) //! show product

router.get('buyer/product/wallet', Controller.topUp)
router.post('buyer/product/wallet', Controller.addTopUp)

router.get('buyer/product/buy/:productId', Controller.buyProduct) //! buying product




module.exports = router