const express = require('express')
const session = require('express-session')
const passport = require('passport')
const morgan = require('morgan');
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.redirect('./index.html')
})

app.use('/',require('./controllers/'))


passport.use(require('./helpers/localStrategy'))
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.listen(3000)