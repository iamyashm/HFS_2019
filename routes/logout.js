const express = require('express')
const jwt = require('jsonwebtoken')
const keyconfig = require('../keyconfig')
const router = express.Router()
const mongoose = require('mongoose')
const middleware = require('../middleware')

router.get('/', middleware.checkToken, function(req, res){
    res.clearCookie('jwttoken')
    res.redirect('../')
})

module.exports = router
