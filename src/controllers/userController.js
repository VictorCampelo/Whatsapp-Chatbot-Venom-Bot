const JsonError = require('../errors/JsonError');

const User = require('../models/User');
const bcrypt = require('bcrypt')

const Joi = require("@hapi/joi")

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

//TO-DO
// ADD FUNTION TO RETURN A QRCODE JSON

// To verify the password later on:

// if(bcrypt.compareSync('somePassword', hash)) {
//  // Passwords match
// } else {
//  // Passwords don't match
// }

module.exports = {
    async create(request, response) {
        const {error} = schema.validate(request.body)
        if(!error){
            try {
                request.body.password = bcrypt.hashSync(request.body.password, 10);
                const result = await User.create(request.body);
                response.status(201);
                response.json(result);
            } catch (error) {
                console.log(error)
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível adicionar o User'));
            }
        }
        else{
            response.status(400).json(JsonError(request, response, error.details[0].message));
        }
        
    },
    
    async read(request, response) {
        try {
            const result = await User.findAll({ raw: true });
            response.json(result);
        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível buscar os Users'));
        }
    },
    
    async update(request, response) {
        try {
            const { id } = request.params;
            const result = await User.findOne({ where: { id } });
            if (result) {
                await result.update(request.body);
                response.json({ status: '200', message: 'Contado atualizado com sucesso' });
            } else {
                response.status(404);
                response.json(JsonError(request, response, 'Contado não encontrado'));
            }
        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível atualizar o User'));
        }
    },
    
    async delete(request, response) {
        const { id } = request.params;
        try {
            const result = await User.findOne({ where: { id } });
            if (result) {
                await result.destroy();
                response.json({ status: '200', message: 'Contado deletado com sucesso' });
            } else {
                response.status(404);
                response.json(JsonError(request, response, 'Contado não encontrado'));
            }
        } catch (error) {
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível deletar o User'));
        }
    }
};