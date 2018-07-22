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
    const bills = await bill.all()
    res.send({ bills })
})

router.post('/show', async (req, res) => {
    const bill = await bill.show(req.body.id)
    res.send({ bill })
})

module.exports = router;
