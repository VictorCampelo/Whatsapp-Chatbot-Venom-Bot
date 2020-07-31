const JsonError = require('../errors/JsonError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const validator = require('../helpers/validation')
const {signAccessToken, signRefreshToken} = require('../middleware/verifyJwt');
const dotenv = require('dotenv');
dotenv.config();
//TO-DO
// ADD FUNTION TO RETURN A QRCODE JSON

module.exports = {
    async login(request, response) {
        let [check, msg, user] = await validator.loginValidation(request);
        if(check === true){
            try {
                user.password = undefined;                
                response.status(201);
                response.json({ 
                    user, 
                    accessToken: await signAccessToken({id: user.id}),
                    refreshToken: await signRefreshToken({id: user.id})
                });
            } catch (error) {
                console.log(error)
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possívelfazer login'));
            }
        }
        else{
            response.status(400).json(JsonError(request, response, msg));
        }
    },
    
    async create(request, response) {
        let [check, msg] = await validator.registerValidation(request);
        console.log(check)
        if(check === true){
            try {
                const salt =  await bcrypt.genSalt(10)
                request.body.password = bcrypt.hashSync(request.body.password, salt);
                const user = await User.create(request.body);
                user.password = undefined;

                response.status(201);
                response.json({ 
                    user, 
                    accessToken: await signAccessToken({id: user.id}),
                    refreshToken: await signRefreshToken({id: user.id})
                });
            } catch (error) {
                console.log(error)
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível adicionar o User'));
            }
        }
        else{
            response.status(400).json(JsonError(request, response, msg));
        }
    },
    
    async read(request, response) {
        try {
            console.log(request.user)
            const result = await User.findAll({ raw: true });
            response.json(result);
        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível buscar os Users'));
        }
    },

    async readAuth(request, response) {
        try {
            console.log(request.userId)
            const result = await User.findOne({where: { id: request.userId}});
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