const JsonError = require('../errors/JsonError');
const User = require('../models/User');
const Product = require('../models/Product')
const bcrypt = require('bcrypt');
const validator = require('../helpers/validation');
const {signAccessToken, signRefreshToken} = require('../middleware/verifyJwt');
const dotenv = require('dotenv');
const fs = require("fs");

const client = require('../helpers/init_redis');

const {fork} = require('child_process');

dotenv.config();

var sayings = new Map();

exports.sayings = sayings;

module.exports = {
    
    async create(request, response) {
        try {
            const {name, price, describe, image_url} = request.body
            User_id = request.userId

            const user = await User.findOne({where: { id: User_id}});

            const product = await Product.create({
                name,
                price,
                describe,
                image_url,
                User_id
            });

            response.status(201);
            response.json({user, product});
        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível adicionar um Produto'));
        }
    },

    async read(request, response) {
        try {
            const id = request.userId

            const user = await User.findByPk(id, {
                include: { association: "products" }
            });

            response.json(user.products);
        } catch (error) {
            console.log(error)
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível buscar os Produtos'));
        }
    },

    async readOne(request, response) {
        try {
            const { id } = request.params
            const result = await Product.findOne({where: { id }});
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
            const result = await Product.findOne({ where: { id } });
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
            const result = await Product.findOne({ where: { id } });
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