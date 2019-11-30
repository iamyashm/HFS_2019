const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const middleware = require('../middleware')

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', middleware.checkToken, async function(req, res) {
    if (req.decoded.user_type === 'admin' || req.decoded.user_type === 'scanner')
        res.render('qrscan')
    else {
        res.status(403).send("Unauthorized Request")
    }
})


module.exports = router
