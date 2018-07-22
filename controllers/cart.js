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

router.post('/order', async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'softwarevideoclub@gmail.com',
            pass: 'Software2'
        }
    })

    const items = await cart.show(req.user.person_id)
    let text = `<h1>${req.user.name}</h1><ul>`
    let prices = []

    for (var i in items) {
        const { name, genre, price } = items[i]
        prices.push(price)
        text += "<li><p>Pelicula: " + name + "</p><p>Precio: " + price + "</p><p>Genero: " + genre + "</li>"
        console.log(prices)
    }

    getSum = (total, num) => {
        return total + num
    }

    const total = prices.reduce(getSum)    
    const d = new Date()
    const date = `${d.getDate()}-${(d.getMonth()+1)}-${d.getFullYear()}` 

    const link = `http://${req.get('host')}/bill/new/${req.user.person_id}/${total}/${date}`

    text += "<p> Total: "+ total +"</p>Se ha realizado una nueva reserva,<br> A continuacion haga click en el siguiente enlace para crear una orden.<br><a href="+link+">Nueva orden</a></ul>"


    // setup e-mail data with unicode symbols
    const mailOptions = {
    // sender address
        from: '<softwareApp@gmail.com>',
    // list of receivers
        to: 'cesarbrazon10@gmail.com',
    // Subject line
        subject: 'Nueva reserva',
        html: text,
    }

    transporter.sendMail(mailOptions, async (error, info) => {
        if(error){
            console.log(error)
            res.send({ status: 400 })
        } else {
            try {
                res.send({ status: 200 })
                const ordered = await cart.order(req.user.person_id)
            } catch (e) {
                res.send({ status: 500 })
            }
        }
  });

})

module.exports = router;
