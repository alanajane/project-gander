const express = require('express')
const dateEventsRouter = express.Router()

const DateEvent = require('../models/dating-profiles')

const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login')
    }
    next()
  }
  
dateEventsRouter.use(isLoggedIn)

// INDEX GET /
dateEventsRouter.get('/', (req, res) => {
  DateEvent.find()
      .exec()
      .then((dateEvent) => {
        res.render('date-events/index.ejs', {
          currentUser: req.session.currentUser,
          dateEvent: dateEvent,
          tabTitle: 'All Dates'
        })
      })
  })
  
  // NEW GET /new
  dateEventsRouter.get('/new', (req, res) => {
    res.render('date-events/new.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Add New Date',
    })
  })
  
  // SHOW GET /:id
  dateEventsRouter.get('/:id', (req, res) => {
    DateEvent.findById(req.params.id)
      .exec()
      .then((dateEvent) => {
        res.render('date-events/show.ejs', {
          dateEvent: dateEvent,
          currentUser: req.session.currentUser,
          tabTitle: 'Show date'
        })
      })
  })
  
  // EDIT GET /:id/edit
  dateEventsRouter.get('/:id/edit', (req, res) => {
    DateEvent.findById(req.params.id)
      .exec()
      .then((dateEvent) => {
        res.render('date-events/edit.ejs', {
            currentUser: req.session.currentUser,
            dateEvent: dateEvent,
            tabTitle: 'Update Date'
        })
      })
  })
  
  // CREATE POST /
  dateEventsRouter.post('/', (req, res) => {
    if (req.body.wantToSeeAgain === 'on') {
        req.body.wantToSeeAgain = true
      } else {
        req.body.wantToSeeAgain = false
      }
      DateEvent.create(req.body)
      .then((dateEvent) => {
        console.log('Created date: ' + dateEvent.id)
        res.redirect('/' + dateEvent.id)
      })
  })
  
  // UPDATE PUT /:id
  dateEventsRouter.put('/:id', (req, res) => {
    if (req.body.wantToSeeAgain === 'on')  {
        req.body.wantToSeeAgain = true
      } else {
        req.body.wantToSeeAgain = false
      }
      DateEvent.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec()
      .then(() => {
        console.log('Updated date')
        res.redirect('/' + req.params.id)
      })
  })
  
  // DESTROY DELETE /:id
  dateEventsRouter.delete('/:id', (req, res) => {
    DateEvent.findByIdAndDelete(req.params.id)
      .exec()
      .then((dateEvent) => {
        console.log('Deleted date: ' + dateEvent.id )
        res.redirect('/')
      })
  })
  


module.exports = dateEventsRouter