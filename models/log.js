const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
    sender: {
        type: Number,
    },

    receiver: {
        type: Number,
    },

    tokens: {
        type: Number,
    },

    time: {
        type : String,
    }
})

const scannedLog = mongoose.model('scannedLog', LogSchema)
const sentLog = mongoose.model('sentLog', LogSchema)
module.exports = {
    scannedLog: scannedLog,
    sentLog: sentLog
}
