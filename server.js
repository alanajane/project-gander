//packages/third-party dependencies
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('express-flash')
const mongoDBSession = require('connect-mongodb-session')

//local dependencies
const homepageRouter = require('./controllers/homepage')
const sessionsController = require('./controllers/sessions')
const usersController = require('./controllers/users')
const datingProfilesController = require('./controllers/dating-profiles')
const dateEventsController = require('./controllers/date-events')


//configuration
const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL

//configuration continued - third-party middleware at application level
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: 'sessions'
})
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}))
app.use(flash())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

//mounting routers into URL and assinging prefix for what controller does
app.use('/', homepageRouter)
app.use('/', sessionsController)
app.use('/users', usersController)
app.use('/profiles', datingProfilesController)
app.use('/dates', dateEventsController)

//finally the initialisation/instantiation block to start the database and application server
mongoose.connect(dbURL, () => {
  console.log('Connected to MongoDB')
})

app.listen(PORT, () => {
  console.log('Server started at port', PORT)
})