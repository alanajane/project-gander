const bcrypt = require('bcrypt')
const express = require('express')
const session = require('express-session')

const User = require('../models/users.js')

const sessionsRouter = express.Router()

sessionsRouter.get('/login', (req, res) => {
  res.render('sessions/login.ejs', {
    tabTitle: 'Log In',
    currentUser: req.session.currentUser,
    baseUrl: req.baseUrl,
  })
})

sessionsRouter.post('/login', (req, res) => {
  User.findOne({ username: req.body.username })
    .exec()
    .then((user) => {
      if (!user) {
        return res.redirect(req.baseUrl + '/login')
      } 
      const passwordIsCorrect = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsCorrect) {
        console.log("password is wrong")
        res.redirect(req.baseUrl + '/login')
      } else {
        console.log(user, 'logged in')
        req.session.currentUser = user
        res.redirect('/profiles/')
      }

    })
})

sessionsRouter.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})


module.exports = sessionsRouter