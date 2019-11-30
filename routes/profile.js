const express = require('express')
const router = express.Router()
const _ = require('lodash')
const {User, validate} = require('../models/user')
const middleware = require('../middleware')

router.get('/', middleware.checkToken, async function(req, res) {
    var reg = req.decoded.reg_no
    try {
        var user = await User.findOne({reg_no: reg})
        var data = {'name': user.name, 'reg_no': user.reg_no, 'tokens': user.tokens, 'type': user.user_type}
        res.render('profile', data)
    }
    catch(err) {
        res.status(404).json({
            success: false
        })
    }
})

module.exports = router
