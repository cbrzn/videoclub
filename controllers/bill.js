const express = require('express')
const bill = require('./../helpers/bill_db')
const router = express.Router()

router.get('/new/:person_id/:total/:date', (req, res) => {
    if (req.user == undefined) {
        res.redirect('/index.html')
    } else {
        const { person_id, total, date } = req.params
        bill.new(person_id, total, date).then(success => {
            res.redirect('/orders.html')
        }).catch(err => {
            console.log(err)
            res.redirect('/index.html')
        })
    }
})

router.get('/all', async (req, res) => {
    if (req.user != undefined) {
        const bills = await bill.all()
        res.send({ bills })

    }
})

router.post('/show', async (req, res) => {
    /*
    if (req.user != undefined) {
        if (req.user.admin == true)
    } 
    */
    const s = await bill.show(req.body.id)
    res.send({ 
        status:200,
        bill:s 
    })
})

router.post('/update', async (req, res) => {
    try {
        const update = await bill.update(req.body.id)
        res.send({ 
            status: 200
        })       
    } catch (e) {
        re.send({ 
            status: 500
        })
    }
})


router.get('/by_user', async (req, res) => {
    try {
        const bills = await bill.by_user(req.user.person_id)
        res.send({ 
            status: 200,
            user:req.user, 
            bills
        })       
    } catch (e) {
        res.send({ 
            status: 500
        })
    }
})

module.exports = router;
