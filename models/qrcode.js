const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QRSchema = new Schema({
    qr_str: {
        type: String,
        required: true
    }
})

const QR = mongoose.model('qrcode', QRSchema)

module.exports = QR
