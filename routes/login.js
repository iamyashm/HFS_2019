const express = require('express')
const jwt = require('jsonwebtoken')
const keyconfig = require('../keyconfig')
const router = express.Router()
const mongoose = require('mongoose')
const {User, validate} = require('../models/user')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, async function(req,res){
    var reqEmail = req.body.email;
    var reqPassword = req.body.password;
    try {
        if(reqEmail && reqPassword) {

            var user = await User.findOne({email: reqEmail})
            if(user) {
                //var dbEmail = user.email
                var dbPass = user.password
                const match = await bcrypt.compare(reqPassword, dbPass);
                if(match) {
                    let token = jwt.sign(
                        {reg_no: user.reg_no, user_type: user.user_type},
                        keyconfig.secret,
                        { expiresIn: '24h'}
                      )
                    res.cookie('jwttoken', token, { maxAge: 3600*24*1000, httpOnly: true })
                    res.redirect('../profile')
                }
                else {
                    res.redirect('back')
                   /* res.redirect(403,'../', {
                        success: false,
                        message: 'Incorrect username or password'


                    })*/
                }
            }
            else {
                res.status(400).json({
                    success: false,
                    message: 'User does not exist'
                })
            }
        }
        else {
            console.log('OK')
            res.status(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            })
        }


    }
    catch(err) {
        console.log('ErR')
        res.status(400).json({
            success: false,
            message: 'User does not exist'})
    }
})


module.exports = router
