const express = require('express');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const user = require('./../helpers/user_db');
const router = express.Router();


router.post('/forgot', (req, res, next) => {
    async.waterfall([
        (done) => {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            user.by_email(req.body.email).then(data => {
                var now = Date.now() + 3600000;
                user.update_password_token(token, now, data.person_id).then((test) => {
                    var smtpTransport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'softwarevideoclub@gmail.com',
                            pass: 'Software2'                
                        }
                    });
                    var mailOptions = {
                        to: data.email,
                        from: 'videoclub@app.com',
                        subject: 'Video club app password reset',
                        text: 'Has recibido este correo porque tu (o alguien mas) han solicitado un cambio de contrasena para tu cuenta.\n\n' +
                            'Por favor haz click en el siguien enlace o copialo y pegalo en tu navegador para completar el proceso:\n\n' +
                            'http://' + req.headers.host + '/password/reset/' + token + '\n\n' +
                            'Si tu no has solicitado esto, por favor ignore este email y tu contrasena permanecera igual.\n'
                    };
                    smtpTransport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            res.send({
                                status: 500
                            });
                        } else {
                            console.log(`Message sent: ${info.response}`);
                            res.send({
                                status: 200
                            });
                        }
                    });
                })
            }).catch((err) => {
                res.send({
                    status: 404
                })
            });
        },
    ], (err) => {
        if (err) return next(err);
        res.send('failed');
    });
});

router.get('/reset/:token', (req, res) => {
    user.by_password_token(req.params.token).then((data) => {
        if (data.reset_password_expires > Date.now()) {
            res.redirect(`/reset.html?token=${req.params.token}`)
        } else {
            res.redirect('/forgot.html?status=404');
        }
    }).catch((err) => {
        res.redirect('/forgot.html?status=403')
    })
});

router.post('/reset/:token', (req, res) => {
    async.waterfall([
        (done) => {
            user.by_password_token(req.params.token).then((data) => {
                user.reset_password(null, null, req.body.password, data.person_id).then((test) => {
                    var smtpTransport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'softwarevideoclub@gmail.com',
                            pass: 'Software2'
                        }
                    });
                    var mailOptions = {
                        to: data.email,
                        from: 'passwordreset@demo.com',
                        subject: 'Your password has been changed',
                        text: 'Hello,\n\n' +
                            'This is a confirmation that the password for your account ' + data.email + ' has just been changed.\n'
                    };
                    smtpTransport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            res.send({
                                status: 500
                            });
                        } else {
                            console.log(`Message sent: ${info.response}`);
                            res.send({
                                status: 200
                            });
                        }
                    });
                }).catch(err => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
                res.send({
                    status: 404
                })
            });
        }
    ], (err) => {
        res.redirect('/');
    });
});

module.exports = router;