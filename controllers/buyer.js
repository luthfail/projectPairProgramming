const { Product, Category, User, Wallet, Transaction } = require('../models');
const topUp = require('../helper/topUp');
const buy = require('../helper/buy');

class Controller{
    static showProduct(req, res){ //!show product
        let product;

        Product.findAll({
            include: [
                {
                    model: Category
                },
            ],
            order: [['name', 'ASC']]
        })
        .then(data => {
            product = data

            return User.findAll({
                include: [
                    {
                        model: Wallet
                    }
                ]
            })  
        })
        .then(user => {
            res.render('buyer/showProduct', { product, user })
        })
        .catch(error => {
            res.send(error)
        })
    }

    static topUp(req, res){ //!topUp
        Wallet.findAll()
        .then(data => {
            res.render('buyer/topUp', { data })
        })
        .catch(error => {
            res.send(error)
        })
    }

    static addTopUp(req, res){ //!add topup
        const { balance } = req.body
        const id = req.params.id

        Wallet.findByPk(id)
        .then(data => {
            return Wallet.update({ accountBalance: topUp(data.accountBalance, +balance) }, {
                where: {id},
            })
        })
        .then(() => {
            res.redirect('/buyer/product')
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
    }

    static buyProduct(req, res){ //!buying product
        const id = req.params.productId
        
        Product.findByPk(id)
        .then(product => {
            return Product.update({
                stock: product.stock - 1,
            }, {
                 where: {id}
            })
        })
        .then(() => {
            res.redirect('/buyer/product')
        })
        .catch(error => {
            res.send(error)
        })
    }
}

module.exports = Controller

//! untuk buyer
/**
 * read product
 * buy
 */


/** //!masalah
 * cara log out dan log in 
 * misahin akses
 */