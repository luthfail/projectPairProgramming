const { User, Product, Category, Transaction, Wallet } = require('../models/index')
const { Op, where } = require('sequelize')

class Controller {
    static showAll(req, res) {
        const sort = req.query.sort
        let option = {
            include:[{model: Category}]
        }

        if(sort) {
           option= {
                ...option,
                order: [[`${sort}`, 'ASC']]
            }
        }
        Product.findAll(option)
        .then(data => {
            res.render('seller/sellerShowAll', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static formAdd(req, res) {
        Category.findAll()
        .then(data => {
            res.render('seller/addProduct', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static addProduct(req, res) {
        const { name, stock, price, Image, description, CategoryId } = req.body
        Product.create({ name, stock, price, Image, description, CategoryId })
        .then(() => {
            res.redirect('/seller/product')
        })
        .catch(err => {
            res.send(err)
        })
    }

    
    static productDetail(req, res) {
        const id = req.params.id
        let data;
        Product.findByPk(id)
        .then(productData => {
            data = productData
            return Category.findAll()
        })
        .then(categoryData => {
            res.render('seller/productDetail', { data, categoryData })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editProduct(req, res) {
        const id =  req.params.id
        const { name, stock, price, Image, description, CategoryId } = req.body
        Product.update({ name, stock, price, Image, description, CategoryId }, {where: { id: id}} )
        .then(() => {
            res.redirect('/seller/product')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteProduct(req, res) {
        const id = req.params.id
        Product.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect('/seller/product')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller