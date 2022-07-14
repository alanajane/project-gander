const express = require('express')

const homepageRouter = express.Router()

homepageRouter.get('/', (req, res) => {
    res.render('index.ejs', {
        tabTitle: 'shoal',
        currentUser: req.session.currentUser,
      })
})


module.exports = homepageRouter