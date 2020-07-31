const Joi = require("@hapi/joi")
const jsonError = require('../errors/JsonError')
const bcrypt2 = require('bcrypt')
const Users = require('../models/User');


module.exports = {
    async registerValidation(req) {
        const schema = Joi.object({
            name: Joi.string()
            .min(6)
            .required(),
            email: Joi.string()
            .min(6)
            .required()
            .email(),
            password: Joi.string()
            .min(6)
            .required()
        });
        const { error } =  schema.validate(req.body)
        
        if(error){
            return [false, error.details[0].message];
            
        }
        
        const check = await Users.findOne({where: {email: req.body.email}})
        if(check){
            console.log(check)
            return [false, 'Email already exist'];
        }
        
        return [true, null];
    },
    
    async loginValidation(req) {
        const schema = Joi.object({
            email: Joi.string()
            .min(6)
            .required()
            .email(),
            password: Joi.string()
            .min(6)
            .required()
        });

        const { error } =  schema.validate(req.body)
        if(error){
            return [false, error.details[0].message, null];
        }
        
        var checkedUser = await Users.findOne({where: {email: req.body.email}})
        if(!checkedUser){
            return [false, 'Email not found', null];
        }
        
        const PwdCheck = await bcrypt2.compare(req.body.password, checkedUser.password)
        
        if(!PwdCheck){
            return [false, 'Invalid Password!', null];
        }
        return [true, null, checkedUser];
    }
    
}