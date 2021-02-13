const validator = require("validator")
const users = require('../db').db().collection('users')
const bcrypt = require('bcryptjs')

let User = function(data){
    
    this.username = data.username,
    this.password = data.password,
    this.email = data.email,
    this.errors = []

}

// This function finds if guest make rule violation while registering
User.prototype.validate = function() {

    if (this.username == "") { this.errors.push("Username shouldn't be empty") }
    if (this.email == "") { this.errors.push("Email cannnot be empty") }
    if (this.password == "") { this.errors.push("Password shouldn't be empty") }
    if (this.password.length > 0 && this.password.length < 8) { this.errors.push("Password should be at least 8 character") }
    if (this.password.username > 0 && this.password.length < 3) { this.errors.push("Username should be at least 3 character") }
    if (!validator.isEmail(this.email)) { this.errors.push("You must provide a valid email.")}
    if(this.username != "" && !validator.isAlphanumeric(this.username)) {this.errors.push("Username can only contain letters and numbers")}

}

// This function controls inputs for security and typo reasons
User.prototype.clearInputs = function() {

    // Checking for user inputs in case different from string
    if (typeof(this.username) != "string") {this.username = ""}

    if (typeof(this.email) != "string") {this.email = ""}

    if (typeof(this.password) != "string") {this.password = ""}

    // Deleting extra spaces and make them all lowercase

    username = this.username.trim().toLowerCase(),
    email = this.email.trim().toLowerCase(),
    password = this.password

}

User.prototype.register = function() {

    // Clearing and validating registration form inputs written by guest
    this.clearInputs()
    this.validate()

    // If there is no error, insert user to database
    if(!this.errors.length) {
        
        // Hashing user password using bcrypt package, with this method user password are safe in database
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password,salt)
        users.insertOne({username: this.username, email: this.email,password: this.password})

    }

}

// Login function return a promise since the time of finding user in database is not determined.
User.prototype.login = function() {

    return new Promise((resolve, reject) => {
        
        this.clearInputs()
        
        users.findOne({username: this.username}).then((found) =>{
            if(found && bcrypt.compareSync(this.password, found.password)) {
                resolve("Welcome again.")
            } else {
                reject("Wrong username or password.")
            }
        }).catch(() => {
            reject("Please try again later.")
        })
    })
}


module.exports = User