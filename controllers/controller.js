const { User } = require('../models');
const bcryptjs = require('bcryptjs');

class Controller {
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
                    return res.redirect('/')
                } else {
                    const error = "invalid username/password"
                    return res.redirect(`/loginForm?error=${error}`)
                }
            }

        })
        .carch(err =>{
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
            res.redirect('/login')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller