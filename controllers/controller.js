const { User, Wallet } = require('../models');
const bcryptjs = require('bcryptjs');

class Controller {
    static home(req, res){
        console.log(req.session, 'LOGOUT')
        res.render('home')
    }

    static loginForm(req, res) {
        res.render('login')
    }

    static logedIn(req,res){
        const {email, password} = req.body
        console.log(password)
        User.findOne({
            where: { email }
        })
        .then(user => {
            if(user){
                const isValidPassword = bcryptjs.compareSync(password, user.password)
                console.log(isValidPassword, 'bcrypts')
                if(isValidPassword){
                    req.session.UserId = user.id
                    if(user.role === 'buyer'){
                        res.redirect('/buyer/product')
                    } else if(user.role === 'seller') {
                        res.redirect('/seller/product')
                    }
                } else {
                    console.log(error, 'asup error')
                    const error = "invalid username/password"
                    return res.redirect(`/login?error=${error}`)
                }
            }

        })
        .catch(err =>{
            console.log(err, 'asup error')
            res.send(err)
        })
    }
    
    static registerForm(req, res) {
        res.render('register')
    }

    static registered(req, res) {

        const {username, profilePict, email, password, role} = req.body
        console.log(password)
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

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }

}

module.exports = Controller