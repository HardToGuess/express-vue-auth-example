const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongooose = require('mongoose')
const { MongoError } = require('mongoose')
const app = express()
import { PORT, dbURL } from '../config/config'
import api from './routes'

mongooose.Promise = global.Promise
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1', api)

mongooose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true })

app.use((error, req, res, next) => {
    if (error && error.statusCode === 401) {
        error.message = 'Invalid username or password'
    }
    if (error && error.statusCode === 400) {
        error.message = 'Bad request. Maybe audit the arguments?'
    }
    res.status(error.statusCode || 500).json({
        message: error.message || 'Something went wrong'
    })
    next(error)
})

mongooose.connection.once('open', () => {
    console.log('Connected to MongoDB server')
    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`)
    })
}).on('error', error => console.log(error))

// "build": "rimraf dist/ && babel ./ --out-dir dist/ --ignore ./node_modules,./.babelrc,./package.json,./npm-debug.log --copy-files"

