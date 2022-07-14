const express = require('express')
const datingProfilesRouter = express.Router()

const upload = require('../middlewares/upload')
const DatingProfile = require('../models/dating-profiles')

const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login')
    }
    next()
  }
  
  datingProfilesRouter.use(isLoggedIn)


// INDEX GET /
datingProfilesRouter.get('/', (req, res) => {
  DatingProfile.find()
      .exec()
      .then((datingProfiles) => {
        res.render('dating-profiles/index.ejs', {
            currentUser: req.session.currentUser,
            datingProfiles: datingProfiles,
            tabTitle: 'All Profiles'
        })
      })
  })
  
  // NEW GET /new
  datingProfilesRouter.get('/new', (req, res) => {
    res.render('dating-profiles/new.ejs', {
        tabTitle: 'Add new profile',
        currentUser: req.session.currentUser,
    })
  })
  
  // SHOW GET /:id
  datingProfilesRouter.get('/:id', (req, res) => {
    DatingProfile.findById(req.params.id)
      .exec()
      .then((datingProfile) => {
        res.render('dating-profiles/show.ejs', {
          datingProfile: datingProfile,
          currentUser: req.session.currentUser,
          tabTitle: 'Show profile'
        })
      })
  })
  
  // EDIT GET /:id/edit
  datingProfilesRouter.get('/:id/edit', (req, res) => {
    DatingProfile.findById(req.params.id)
      .exec()
      .then((datingProfile) => {
        res.render('dating-profiles/edit.ejs', {
            datingProfile: datingProfile,
            currentUser: req.session.currentUser,
            tabTitle: "Update profile"
        })
      })
  })
  
  // CREATE POST /
  datingProfilesRouter.post('/', upload.single('image'),(req, res) => {
    req.body.imageURL = req.file.path
    Profile.create(req.body)
      .then((datingProfile) => {
        console.log('Created profile: ' + datingProfile)
        res.redirect('/' + datingProfile.id)
      })
  })
  
  // UPDATE PUT /:id
  datingProfilesRouter.put('/:id', (req, res) => {
    DatingProfile.findByIdAndUpdate(req.params.id, req.body)
      .exec()
      .then(() => {
        res.redirect('/' + req.params.id)
      })
  })
  
  // DESTROY DELETE /:id
  datingProfilesRouter.delete('/:id', (req, res) => {
    DatingProfile.findByIdAndDelete(req.params.id)
      .exec()
      .then(() => {
        res.redirect('/')
      })
  })
  


module.exports = datingProfilesRouter