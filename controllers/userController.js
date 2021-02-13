const User = require('../models/User')

exports.login = function(req, res) {

    let user = new User(req.body)

    user.login().then(function(result) {
        req.session.user = {username: user.data.username}

        res.send(result)
    }).catch(function(err) {
        res.send(err)
    })


    

}

exports.logout = function() {
    
}

exports.register = function(req, res) {
    let user = new User(req.body)
    user.register()
    
    if (user.errors.length == 0) {
        res.send("Thanks")
    } else {
        res.send(user.errors)
    }
    
    
}

exports.home = function(req, res) {
    if (req.session.user) {
        res.send("req.session.user")
    } else {
        res.render('home-guest')
    }

}