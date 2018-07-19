const express = require('express');
const nodemailer = require('nodemailer');
const cart = require('./../helpers/cart_db');
const router = express.Router();


router.post('/new', (req, res) => {
    const id = (req.user == undefined) ? null : req.user.person_id
    cart.new(id, req.body.id).then(success => {
        res.send({ status: 200 });
    }).catch((err)=>{
        res.send({ status: 500 });
    });
});

router.get('/show', (req, res) => {
    const id = (req.user == undefined) ? 'a' : req.user.person_id
    cart.show(id).then(cart =>{
        res.send({ 
            status: 200,
            cart
        })
    }).catch(err => {
        res.send({ 
            status: 403
        })
    })
})

router.get('/delete/:id', (req, res) => {
  cart.delete_product_from_cart(req.user.id, req.params.id).then((data) =>{
    res.send({product:data});
    console.log(req.user.id)
    }).catch((err)=>{
        throw err;
    });
});

router.post('/order', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'softwarevideoclub@gmail.com',
               pass: 'Software2'
           }
       })
    
    const link = `http://${+req.get(host)}/new/`
    const text = `<h1>${req.user.name}</h1>`

})

module.exports = router;
