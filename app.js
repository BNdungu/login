const express = require('express')
require('./db/connect')
const parser = require('body-parser')
const {v4:uuidv4} = require('uuid')
const session = require('express-session')
const tasks = require('./routes/tasks')

const app = express()
port = process.env.PORT||3000

app.set('view engine', 'ejs')
app.use(express.static('./views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))
app.use('/api/auth/v1/',tasks)

app.listen(port,() => {
    console.log('Server is listenning at http//localhost:3000') 
})