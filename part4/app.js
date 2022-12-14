const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')

morgan.token('body', request => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

logger.info('connecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl)
    .then(() => {
        logger.info('connected to mongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to mongoDB', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', middleware.tokenExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testingRouter')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app