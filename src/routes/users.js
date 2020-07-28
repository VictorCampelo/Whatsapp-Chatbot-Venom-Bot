const Router = require('express');
const userController = require('../controllers/userController');

const routesUser = Router();

routesUser.post('/users', userController.create);
routesUser.get('/users', userController.read);
routesUser.put('/users/:id', userController.update);
routesUser.delete('/users/:id', userController.delete);

module.exports = routesUser;