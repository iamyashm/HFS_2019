const jwt = require('jsonwebtoken')
const keyconfig = require('./keyconfig')

var checkToken = (req,res,next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.cookies['jwttoken']
    if(token) {
        if(token.startsWith('Bearer '))
        token = token.slice(7, token.length)
        jwt.verify(token, keyconfig.secret, (err, decoded)=>{
            if(err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                })
            }
            else {
                req.decoded = decoded
                next()
            }
        })
    }
    else {
        return res.json({
            success: false,
            message: 'Auth token not supplied'
        })
    }
}

module.exports = {
    checkToken: checkToken
}
