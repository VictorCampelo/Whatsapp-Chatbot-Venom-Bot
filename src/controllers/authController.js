const JsonError = require('../errors/JsonError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const validator = require('../helpers/validation')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../middleware/verifyJwt');
const dotenv = require('dotenv');
const createHttpError = require('http-errors');
const client = require("../helpers/init_redis");
const { promises } = require('fs');

dotenv.config();

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
    
    async register(request, response) {
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

    async logout(request, response) {
        try {
            const refreshToken = request.body
            if (!refreshToken) throw createHttpError.BadRequest()
    
            const userId = await verifyRefreshToken(refreshToken.refresh_token)

            client.DEL(userId, (err, val) => {
              if (err) {
                console.log(err.message)
                response.status(400).json(createError.InternalServerError())
              }
              promises.resolve()
              console.log(val)
              response.status(200).json("User logout")
            })
          } catch (error) {
                console.log(error)
                response.status(401);
                response.json(JsonError(request, response, 'Logout Error'));
          }
    },
}