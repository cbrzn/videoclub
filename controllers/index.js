const express = require ('express')
const router = express.Router()

router.use('/',require('./session'))
router.use('/movies',require('./movie'))
router.use('/cart',require('./cart'))
router.use('/bill',require('./bill'))
router.use('/password',require('./password'));

module.exports = router
