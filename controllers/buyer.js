const { Product, Category, User, Wallet, Transaction } = require('../models');
const { Op } = require('sequelize');
const topUp = require('../helper/topUp');
const buy = require('../helper/buy');
const nodemailer = require("nodemailer");

class Controller{
    static showProduct(req, res){ //!show product
        let product;
        const name = req.query.name

        if(name){
            Product.findAll({
                include: [
                    {
                        model: Category
                    },
                ],
                order: [['name', 'ASC']],
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            .then(data => {
                product = data
                return User.findByPk(req.session.UserId, {
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
        }else{
            Product.productOutOfStock()
            .then(data => {
                product = data
    
                return User.findByPk(req.session.UserId, {
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
    }

    static topUp(req, res){ //!topUp
        Wallet.findByPk(req.session.UserId)
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
            res.send(error)
        })
    }

    static buyProduct(req, res){ //!buying product
        const id = req.params.productId
        let price;

        Product.findByPk(id)
        .then(data => {
            price = data.price
            return Transaction.create({
                ProductId: data.id,
                UserId: req.session.UserId,
                Price: price
            })
        })
        .then(() => {
            return Wallet.findOne({
                where: {UserId: req.session.UserId}
            })
        })
        .then(bought => {
            return Wallet.update({
                accountBalance: buy(bought.accountBalance, price)
            },{where: { UserId: req.session.UserId}})
        })
        .then(() => {
            return Product.findByPk(id)
        })
        .then(product => {
            return Product.update({
                stock: product.stock - 1,
            }, {
                 where: {id}
            })
        })
        .then(() => {
            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: `susgamesstore@outlook.com`,
                    pass: 'BuatanMadeSamaLuthfy22',
                },
            });
            let mailOptions = {
                from: "susgamesstore@outlook.com",
                to: `${req.session.email}`,
                subject: "Register Success",
                text: `Congratulations! You have successfully bought our games!`,
            };
            transporter.sendMail(mailOptions, function (err, succes) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Email is sent");
                }
            });
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