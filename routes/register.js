const {User, validate} = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')

const saltRounds = 10

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, async function(req,res) {

    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    try {

        let user = await User.findOne({email: req.body.email})
        if(user) {
            console.log(user)
            return res.status(400).send('That user already exisits!')
        }

        user = await User.findOne({reg_no: req.body.reg_no})
        if(user) {
            return res.status(400).send('That user already exisits!')
        }

        else {
            var hash = await bcrypt.hash(req.body.password, saltRounds)
            user = new User({
                "name": req.body.name,
                "email": req.body.email,
                "password": hash,
                "reg_no": req.body.reg_no,
                "user_type": req.body.user_type,
                "tokens": req.body.tokens
            })

            await user.save();
            res.send(user);
        }
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router
