const router = require('express').Router();

const Users = require('./user-model.js');

const theAuth = require('../auth/middleware')

router.get('/', theAuth, (req, res) => {
    Users.find()
      .then(users => {
          res.json(users)
      })
      .catch(error => res.send("Error with Token"))
})

module.exports = router;