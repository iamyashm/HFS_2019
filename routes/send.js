/*
 ROUTE TO SEND TOKENS
*/

const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/user')
const middleware = require('../middleware')

const bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', middleware.checkToken, urlencodedParser, async function(req, res) {
    try {
        var userList = await User.find()
        userList = userList.map((user)=>{
            return {
                name: user.name,
                reg_no: user.reg_no
            }
        })
        res.render('sendtokens', {userList: userList})
        //res.status(200).json(userList)
    }
    catch(err) {
        res.send('Error has Occured')
    }
})
module.exports = router
