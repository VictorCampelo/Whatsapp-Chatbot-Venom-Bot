const JsonError = require('../errors/JsonError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('../helpers/validation');
const {signAccessToken, signRefreshToken} = require('../middleware/verifyJwt');
const dotenv = require('dotenv');
const fs = require("fs")

const client = require('../helpers/init_redis');

const {fork} = require('child_process');

dotenv.config();

var sayings = new Map();

//TO-DO
// ADD FUNTION TO RETURN A QRCODE JSON

exports.sayings = sayings;

module.exports = {
    
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
            console.log("nao era pra entraar")
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
        try {
            const { id } = request.params;
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
    },
    
    async qrcode(request, response){
        try {
            //const {initBot, exportPid} = require("../utils/venomBot")
            let userId = request.userId
            
            const forked = fork('src/utils/venomBot.js')

            forked.send(userId.toString());
            
            console.log(forked.pid)
            
            // forked.pid // 189...
            // forked.killed // false
            // forked.kill();
            // forked.killed // true
            
            await new Promise(resolve => setTimeout(resolve, 10000));
            // HERE HAVE TO TAKE A QRCODE FROM REDIS OR ANOTHER DB 
            
            client.get(userId.toString()+'qrcode', function(err,result){
                response.status(200).json(result)
            });

        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível atualizar o User'));
        }
    }
};