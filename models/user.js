const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },

    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },

    password: {
        type: String,
        minlength: 5,
        maxlength: 80,
        required: true
    },

    reg_no: {
        type: Number,
        required: true,
        unique: true
    },

    user_type: {
        type: String,
        required: true
    },

    tokens: {
        type: Number,
        default: 0,
        min: 0,
        max: 200
    }
})

const User = mongoose.model('user', UserSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(50).required(),
        reg_no: Joi.number().required(),
        user_type: Joi.string().required(),
        tokens: Joi.number().integer().min(0).max(200)
    }
    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser
