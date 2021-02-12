const validator = require("validator")
const database = require('../db')
const users = database.collection('users')

let User = function(data){
    
    this.data = data
    this.errors = []
}

User.prototype.validate = function() {

    if (this.data.username == "") { this.errors.push("Username shouldn't be empty") }

    if (this.data.email == "") { this.errors.push(" n                                                                                                                      pty") }

    if (this.data.password == "") { this.errors.push("Password shouldn't be empty") }

    if (this.data.password.length > 0 && this.data.password.length < 8) { this.errors.push("Password should be at least 8 character") }
    
    if (this.data.password.username > 0 && this.data.password.length < 3) { this.errors.push("Username should be at least 3 character") }

    if (!validator.isEmail(this.data.email)) { this.errors.push("You must provide a valid email.")}

    if(this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username can only contain letters and numbers")}
}

User.prototype.cleanUp = function() {

    if (typeof(this.data.username) != "string") {this.data.username = ""}

    if (typeof(this.data.email) != "string") {this.data.email = ""}

    if (typeof(this.data.password) != "string") {this.data.password = ""}

    // Get rid of any bogus properties

    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }

}

User.prototype.register = function() {

    //Step 1 : Validate User Data
    this.cleanUp()
    this.validate()

    
    //Step 2 : If no error, Add user to database
    if(!this.errors.length) {
        users.insertOne(this.data)
    }

}

User.prototype.login = function() {

    return new Promise((resolve, reject) => {
        this.cleanUp()
        
        users.findOne({username: this.data.username}).then((info) =>{
            if(info && info.password == this.data.password) {
                resolve("Cong")
            } else {
                reject("Wrong username or password")
            }
        }).catch(() => {
            reject("Please try again later.")
        })
    })

}



module.exports = User