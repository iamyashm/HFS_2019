const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {User, validate} = require('../models/user')
const QR = require('../models/qrcode')
const middleware = require('../middleware')
const scannedLog = require('../models/log.js').scannedLog

const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', middleware.checkToken, urlencodedParser, async function(req, res) {
    var qr_text = req.body.qr_text
    if(req.decoded.user_type === 'admin' || req.decoded.user_type === 'scanner') {
        try {
            var regno = Number(qr_text.substring(qr_text.indexOf('_')+1, qr_text.lastIndexOf('_')))
            var amount = Number(qr_text.substring(qr_text.lastIndexOf('_')+1))

            var qr = await QR.findOne({qr_str: qr_text})
            if(qr === null) {
                var newqr = new QR({qr_str: qr_text})
                await newqr.save()
                var user = await User.findOneAndUpdate({reg_no: regno}, {$inc:{tokens: -amount}})
                var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"})
                indiaTime = new Date(indiaTime).toLocaleString()
                var newLog = new scannedLog({sender: req.decoded.reg_no, receiver: regno, tokens: amount, time: indiaTime})

                var addedLog = await newLog.save()

                res.status(200).json({success: true, message: 'QR scanned successfully'})
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'QR has already been used'
                })
            }
        }
        catch(err) {
            res.status(404).json({
                success: false
            })
        }
    }
    else {
        res.status(403).json({
            success: false,
            message: 'Permission denied'
        })
    }
})

module.exports = router

