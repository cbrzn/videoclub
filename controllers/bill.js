const express = require('express')
const bill = require('./../helpers/bill_db')
const router = express.Router()

router.get('/new/:person_id/:total/:date', (req, res) => {
    const { person_id, total, date } = req.params
    bill.new(person_id, total, date).then(success => {
        res.redirect('/orders.html')
    }).catch(err => {
        console.log(err)
        res.redirect('/index.html')
    })
})

module.exports = router;
