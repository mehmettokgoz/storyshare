const express = require('express')
const app = express()

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Set public folder to open everyone (css files, browser based js files)
app.use(express.static('public'))

// Set views folder as source for views
app.set('views', 'views')

// Javascript view engine is set as ejs
app.set('view engine', 'ejs')

app.use('/', router)

app.listen(3000)
