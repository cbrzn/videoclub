const User = require('./user_db');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (username, password, done) => {
    User.by_email(username).then(user => {
        if (user.error) {
            return done(null, false, {
                message: "email not found",
                status:404
            });
        }
        let hashedPass = bcrypt.hash(password, 10);
        User.compare_password(password, user.password).then((isMatch) => {
            if (isMatch) {
                return done(null, user);
             } else {
                return done(null, false, {
                    message: 'wrong password'
                });
            }
        }).catch((err) => {
            throw err;
        });
    }).catch((err) => {
        console.log(err)
        return done(null, false, {
            message: "email not found"
        });
        // throw err;
    });
});