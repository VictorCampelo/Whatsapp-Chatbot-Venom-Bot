const Router = require('express');
const userController = require('../controllers/userController');
const {verifyAccessToken} = require('../middleware/validateAcessToken');
const productController = require('../controllers/productController');
const routesProduct = Router();

routesProduct.post('/users/product', verifyAccessToken, productController.create);
routesProduct.get('/users/product', verifyAccessToken, productController.read);
routesProduct.get('/users/product/:id', verifyAccessToken, productController.readOne);
routesProduct.put('/users/product/:id', verifyAccessToken, productController.update);
routesProduct.delete('/users/product/:id', verifyAccessToken, productController.delete);

module.exports = routesProduct;