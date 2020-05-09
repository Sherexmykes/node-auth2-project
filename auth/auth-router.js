const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const gt = require('../auth/generateToken.js')

const Users = require('../users/user-model.js');

//CRUDs go here
router.post('/register', (req, res) => {
    let user = req.body;
    const rounds = process.env.HASH_ROUNDS || 6;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    Users.add(user)
      .then(saved => {
          const token = gt.generateToken(user)
          res.status(201).json({saved, token})
      })
      .catch(error => {
          res.status(500).json(error);
      })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
              const token = gt.generateToken(user)
              res.status(200).json({
                  message: `welcome ${user.username}`, token
              })
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
      });
})



module.exports = router;