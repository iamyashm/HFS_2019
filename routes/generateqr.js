const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/user')
const middleware = require('../middleware')
const fs = require('fs')
const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', middleware.checkToken, urlencodedParser, async function(req, res) {
    var amount = req.body.amount
    console.log(req.body)
    var redeemer = req.decoded.reg_no
    try {
        var user = await User.findOne({reg_no: redeemer})

        if(amount > user.tokens) {
            return res.status(401).json({
                success: false,
                message: 'Not enough tokens'
            })
        }
        else {
            let qr_text = new Date().getTime() + "_" + redeemer + "_" + amount
            res.status(200).json({
                "success": true,
                "qr_text": qr_text
            })


        }
    }
    catch(err) {
        res.status(404).json({
            success: false
        })
    }

})

module.exports = router
