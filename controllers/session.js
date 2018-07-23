const express = require('express')
const passport = require('passport')
const auth = require('./../middlewares/isAuth')
const user = require('./../helpers/user_db')
const router = express.Router()

router.post('/login', auth.isLogged, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).send({
                err: info
            })
        }
        req.logIn(user, err => {
            if (err) {
                return res.send({
                    err: 'Could not log in user'
                })
            }
            res.send({
                status:200
            })
        })
    })(req, res, next)
})


router.post('/signup', auth.isLogged, (req, res, next) => {
    const { name, email, password, location } = req.body
    user.new(name, email, password, location).then(success => {
        res.send({ status:200 })
    }).catch(err => {
        console.log(err)
        res.send({ status: 500 })
    })
})

router.get('/value', auth.isAuth, (req,res) => {
    res.send({
        status: 200,
        session:req.session.passport, 
        id:req.user.id
    })
})

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout()
    res.send({
        status: 200
    })
})

module.exports = router
