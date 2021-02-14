const User = require('../models/User')

exports.login = function(req, res) {

    let user = new User(req.body)

    user.login().then(function(result) {

        req.session.user = {username: user.username}
        req.session.save(function() {
            res.redirect('/')
        })

    }).catch(function(err) {
        req.flash('errors', err)
        req.session.save(function(){
            res.redirect('/')
        })

    })
}

exports.logout = function(req, res) {

    // Using callback to be sure about timing of session delete function
    req.session.destroy(function() {
        res.redirect('/')
    })

}

exports.register = function(req, res) {

    let user = new User(req.body)
    user.register().then(function(){
        req.session.user = {username: user.username}
        req.session.save(function(){
            res.redirect('/')
        })

    }).catch((regErrors) => {

        regErrors.forEach(function(err){
            req.flash('regErrors', err)
        })
        
        req.session.save(function(){
            res.redirect('/')
        })
        
    })
    


}

exports.home = function(req, res) {
    
    if (req.session.user) {
        res.render('home-dashboard', {username: req.session.user.username})
    } else {
        res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }

}