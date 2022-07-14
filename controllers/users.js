const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const userRouter = express.Router()

userRouter.get('/signup', (req, res) => {
  res.render('users/signup.ejs', {
    currentUser: req.session.currentUser,
    tabTitle: 'Sign Up',
    baseUrl: req.baseUrl,
  })
})

userRouter.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync()
  )

  User.create(req.body)
    .then((newUser) => {
      console.log('created user is: ', newUser)
      res.redirect('/')
    })
    .catch((err) => {
      req.flash('info', 'Username already exists')
      res.redirect(req.baseUrl + '/signup')
      console.log('err', err)
    })
})
module.exports = userRouter