const Joi  = require('joi')
const User = require('../models/user.model')

module.exports = {


    // POST /v1/users
    createUser: {
        body: {
            email:    Joi.string().email().required(),
            password: Joi.string().min(6).max(128).required(),
            name:     Joi.string().max(128),
            role:     Joi.string(),
        },
    },

}
