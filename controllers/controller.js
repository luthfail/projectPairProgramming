const { User, Wallet } = require('../models');
const bcryptjs = require('bcryptjs');

class Controller {
    static home(req, res){
        res.render('home')
    }

    static loginForm(req, res) {
        res.render('login')
    }

    static logedIn(req,res){
        const {username, password} = req.body

        User.findOne({where: (username)})
        .then(user => {
            if(user){
                const isValidPassword = bcryptjs.compareSync(password, user.password)
                if(isValidPassword){
                    req.session.UserId = user.id
                    return res.redirect('/direct')
                } else {
                    const error = "invalid username/password"
                    return res.redirect(`/loginForm?error=${error}`)
                }
            }

        })
        .catch(err =>{
            res.send(err)
        })
    }

    static registerForm(req, res) {
        res.render('register')
    }

    static registered(req, res) {

        const {username, profilePict, email, password, role} = req.body

        User.create({username, profilePict, email, password, role})
        .then(newUser => {
            return Wallet.create({
                UserId: newUser.id,
                accountBalance: 0
            })
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static direct(req, res){
        User.findAll()
        .then(data => {
            data.forEach(el => {
                if(el.role === 'buyer'){
                    res.redirect('/buyer/product')
                }
            })
        })
        .catch(error => {
            res.send(error)
        })
    }
}

module.exports = Controller