const express = require('express')

const session = require('express-session')

const MongoStore = require('connect-mongo')(session)

const flash = require('connect-flash') 

const router = require('./router')

let sessionOptions = session({
    secret: "Test",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60 * 60 * 24, httpOnly: true}
})

const app = express()

app.use(sessionOptions)

app.use(flash())

app.use(express.urlencoded({extended: false}))

app.use(express.json())

// Set public folder to open everyone (css files, browser based js files)
app.use(express.static('public'))

// Set views folder as source for views
app.set('views', 'views')

// Javascript view engine is set as ejs
app.set('view engine', 'ejs')

app.use('/', router)

module.exports = app