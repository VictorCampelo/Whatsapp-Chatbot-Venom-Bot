const JsonError = require('../errors/JsonError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('../helpers/validation');
const dotenv = require('dotenv');
const fs = require("fs")
const client = require('../helpers/init_redis');
const Stage_Response = require('../models/Stage_Response');
const { report } = require('../routes');

dotenv.config();

module.exports = {
    
    async create(request, response) {
        try {
            const {
                stage1, 
                stage2, 
                stage3, 
                stage4, 
                stage5,
                stage6
            } = request.body
            
            const User_id = request.userId
            
            const user = await User.findByPk(User_id, {
                include: { association: "stages" }
            });
            
            if (!user.stages) {
                const stages = await Stage_Response.create({
                    stage1, 
                    stage2, 
                    stage3, 
                    stage4, 
                    stage5,
                    stage6,
                    User_id
                });
                
                response.status(201);
                response.json({user, stages});   
            } else {
                response.status(500);
                response.json(JsonError(request, response, 'Não é possivel adicionar mais um conjunto de reposta ao usuário'));
            }
        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível adicionar o Conjuto de repostas'));
        }
    },
    
    async read(request, response) {
        try {
            const id = request.userId

            const user = await User.findByPk(id, {
                include: { association: "stages" }
            });

            response.json(user.stages);
        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível buscar os Produtos'));
        }
    },
    
    async readOne(request, response) {
        try {
            const { id } = request.params
            const result = await Stage_Response.findOne({where: { id }});
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
            const result = await Stage_Response.findOne({ where: { id } });
            if (result) {
                await result.update(request.body);
                response.json({ status: '200', message: 'Produto atualizado com sucesso' });
            } else {
                response.status(404);
                response.json(JsonError(request, response, 'Produto não encontrado'));
            }
        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível atualizar o Produto'));
        }
    },
    
    async delete(request, response) {
        try {
            const { id } = request.params;
            const result = await Stage_Response.findOne({ where: { id } });
            if (result) {
                await result.destroy();
                response.json({ status: '200', message: 'Produto deletado com sucesso' });
            } else {
                response.status(404);
                response.json(JsonError(request, response, 'Produto não encontrado'));
            }
        } catch (error) {
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível deletar o Produto'));
        }
    }
    
}