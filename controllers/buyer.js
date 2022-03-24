const { Product, Category, User, Wallet, Transaction } = require('../models');

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
            res.render('showProduct', { product, user })
        })
        .catch(error => {
            res.send(error)
        })
    }

    static topUp(req, res){ //!topUp
        res.render('topUp', )
    }

    static addTopUp(req, res){ //!add topup
        const { accountBalance } = req.body

        Wallet.update({ accountBalance }, {
            where: {
                accountBalance: +accountBalance
            }
        })
        .then(() => {
            res.redirect('buyer/product')
        })
        .catch(error => {
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
            res.redirect('buyer/product')
        })
        .catch(error => {
            res.send(error)
        })
    }
}

module.exports = Controller

//! untuk buyer
/**
 * edit profile (kalau udah beres semua)
 * read product
 * buy
 * top up 
 */


/** //!masalah
 * cara log out dan log in 
 * misahin akses
 */