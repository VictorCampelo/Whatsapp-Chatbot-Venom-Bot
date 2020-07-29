const JsonError = require('../errors/JsonError');

const User = require('../models/User');

//TO-DO
// ADD FUNTION TO RETURN A QRCODE JSON

module.exports = {
    async create(request, response) {
        // try {
        //     const result = await User.create(request.body);
        //     response.status(201);
        //     response.json(result);
        // } catch (error) {
        //     response.status(500);
        //     response.json(JsonError(request, response, 'Não foi possível adicionar o User'));
        // }
        response.json({message: "POST USERS: Tudo ok por aqui!"});
    },

    async read(request, response) {
        // try {
        //     const result = await User.findAll({ raw: true });
        //     response.json(result);
        // } catch (error) {
        //     response.status(500);
        //     response.json(JsonError(request, response, 'Não foi possível buscar os Users'));
        // }
        response.json({message: "Get USERS: Tudo ok por aqui!"});
    },

    async update(request, response) {
        // try {
        //     const { id } = request.params;
        //     const User = await User.findOne({ where: { id } });
        //     if (User) {
        //         await User.update(request.body);
        //         response.json({ status: '200', message: 'Contado atualizado com sucesso' });
        //     } else {
        //         response.status(404);
        //         response.json(JsonError(request, response, 'Contado não encontrado'));
        //     }
        // } catch (error) {
        //     response.status(500);
        //     response.json(JsonError(request, response, 'Não foi possível atualizar o User'));
        // }
        response.json({message: "PUT USERS: Tudo ok por aqui!"});
    },

    async delete(request, response) {
        // const { id } = request.params;
        // try {
        //     const User = await User.findOne({ where: { id } });
        //     if (User) {
        //         await User.destroy();
        //         response.json({ status: '200', message: 'Contado deletado com sucesso' });
        //     } else {
        //         response.status(404);
        //         response.json(JsonError(request, response, 'Contado não encontrado'));
        //     }
        // } catch (error) {
        //     response.status(500);
        //     response.json(JsonError(request, response, 'Não foi possível deletar o User'));
        // }
        response.json({message: "DELETE USERS: Tudo ok por aqui!"});
    }
};