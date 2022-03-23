class Controller{
    static login(req, res){
        res.render('login')
    }

    static formRegist(req, res){
        res.render('formRegister')
    }

    static addRegist(req, res){
        res.send('regist')
    }
}

module.exports = Controller