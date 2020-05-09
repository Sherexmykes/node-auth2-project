const router = require('express').Router();

const Users = require('./users-model.js');

const theAuth = require('../auth/amiddleware')

router.get('/', theAuth, (req, res) => {
    Users.find()
      .then(users => {
          res.json(users)
      })
      .catch(error => res.send("Error with Token"))
})

module.exports = router;