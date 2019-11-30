const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/hfsportal',{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=>console.log('Connected to MongoDb'))
    .catch(err => console.log('Error:  ' + err))

app.set('view engine', 'ejs')
app.use(cookieParser())

app.get('/', function(req,res){
    if(req.cookies['jwttoken'] === undefined)
        res.render('login')
    else
        res.redirect('profile')
})

app.use(express.static('./views'))
app.use('/receive', require('./routes/receive'))
app.use('/send', require('./routes/send'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/profile', require('./routes/profile'))
app.use('/generateqr', require('./routes/generateqr'))
app.use('/scanqr', require('./routes/scanqr'))
app.use('/logout', require('./routes/logout'))

app.use(bodyParser.json())

app.use('/sendtoken', require('./routes/sendtoken'))

app.listen(process.env.port || 3000, function(){
    console.log('listening...')
})
