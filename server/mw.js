const jwt = require('jsonwebtoken')
const passwords = require('./passwords')

const onlyUsers = (req, res, next) => {
    const token = req.header("Authorization")
    if (token) {
        jwt.verify(token, passwords.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.sendStatus(401)
                throw err
            }
            req.user = decoded
            next()
        })
    } else {
        res.status(401).send("token not found")
    }
}

const onlyAdmins = (req, res, next) => {
    const token = req.header("Authorization")
    if (token) {
        jwt.verify(token, passwords.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.sendStatus(401)
                throw err
            }
            if (decoded.isAdmin) {
                next()
            } else {
                res.status(403).send("not yours not touch!")
            }
        })
    } else {
        res.status(401).send("token not found")
    }
}


module.exports = { onlyAdmins: onlyAdmins };