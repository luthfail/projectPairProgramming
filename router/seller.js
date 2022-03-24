const express = require('express');
const router = express.Router()
const Controller = require('../controllers/seller')

router.get('/product', Controller.showAll)
router.get('/product/add', Controller.formAdd)
router.post('/product/add', Controller.addProduct)
router.get('/product/:id', Controller.productDetail)
router.post('/product/:id', Controller.editProduct)
router.get('/product/:id/delete', Controller.deleteProduct)

module.exports = router