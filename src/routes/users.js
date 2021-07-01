const Router = require('express');
const userController = require('../controllers/userController');
const {verifyAccessToken} = require('../middleware/validateAcessToken');
const routesUser = Router();

routesUser.post('/users', verifyAccessToken, userController.create);
routesUser.get('/users', verifyAccessToken, userController.read);
routesUser.get('/authusers', verifyAccessToken, userController.readAuth);
routesUser.put('/users/:id', verifyAccessToken, userController.update);
routesUser.delete('/users/:id', verifyAccessToken, userController.delete);

// CREATE A QRCODE IMAGE TO USER DYNAMICALLY

routesUser.get('/users/qrcode', verifyAccessToken, userController.qrcode);

module.exports = routesUser;