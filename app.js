const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const studentRoutes = require('./routes/studentInfo')
const loginNewUserRoutes = require('./routes/loginNewUser')
const mainDashboardRoutes = require('./routes/mainDashboard') 

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') //add the domain 'math.flcinc.org where the star is to limit access to the api
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(studentRoutes) 

app.use(loginNewUserRoutes)

app.use(mainDashboardRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message: message, data: data })
})

mongoose.connect('mongodb+srv://maurina:k9DlcNK4TSlGgn3b@cluster0-wk7lo.mongodb.net/user?retryWrites=true&w=majority'
).then(result => {
    app.listen(8000)
})
.catch(err => console.log(err))

