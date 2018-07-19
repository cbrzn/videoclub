let User = require('./user_db');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (username, password, done) => {
    User.get_user_by_email(username).then((user) => {
        if (user.error) {
            return done(null, false, {
                message: "email not found",
                status:404
            });
        }
        let hashedPass = bcrypt.hash(password, 10);
        User.compare_password(password, user.password).then((isMatch) => {
            if (isMatch)
                return done(null, user);
            else
                return done(null, false, {
                    message: 'wrong password'
                });
        }).catch((err) => {
            throw err;
        });
    }).catch((err) => {
        return done(null, false, {
            message: "email not found"
        });
        // throw err;
    });
});