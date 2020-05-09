const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    const secret = secrets.jwSecret

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err){
            console.log(err)
            res.status(401).json({message: 'Error in token validation'})
        } else {
            req.decodedToken = decodedToken
            next()
        }
    })
}