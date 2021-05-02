const env = process.env.NODE_ENV
if(env === 'development' || env === 'test'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const courseRouter = require('./routes/course_router')
const invoiceRouter = require('./routes/invoice_router')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use('/courses', courseRouter)
app.use('/invoices', invoiceRouter)
app.use('/', (req, res) => {
    res.send('hello world')
})

module.exports = app