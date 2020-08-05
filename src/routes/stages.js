const Router = require('express');
const userController = require('../controllers/userController');
const {verifyAccessToken} = require('../middleware/validateAcessToken');
const productController = require('../controllers/productController');
const stagesController = require('../controllers/stagesController');
const routesStages = Router();

routesStages.post('/users/stages', verifyAccessToken, stagesController.create);
routesStages.get('/users/stages', verifyAccessToken, stagesController.read);
routesStages.put('/users/stages/:id', verifyAccessToken, stagesController.update);
routesStages.delete('/users/stages/:id', verifyAccessToken, stagesController.delete);

module.exports = routesStages;