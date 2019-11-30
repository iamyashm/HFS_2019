/*
 ROUTE TO UPDATE TOKENS AFTER SENDING
*/

const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/user')
const middleware = require('../middleware')
const sentLog = require('../models/log').sentLog

router.post('/', middleware.checkToken, async function(req, res) {
    var recipients = req.body.recipients
    var amount = req.body.amount || 1
    var reg = req.decoded.reg_no
    if(req.decoded.user_type === 'admin') {
        try {
            for(var recipient of recipients) {
                await User.findOneAndUpdate({reg_no: recipient.reg_no}, {$inc:{tokens: amount}})
                var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"})
                indiaTime = new Date(indiaTime).toLocaleString()
                var newLog = new sentLog({sender: req.decoded.reg_no, receiver: recipient.reg_no, tokens: amount, time: indiaTime})

                var addedLog = await newLog.save()
            }
            res.status(200).json({success: true, message: 'Tokens sent successfully'})
        }
        catch(err) {
            res.status(500).json({
                success: false,
                message: 'Error has occured: ' + err
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
