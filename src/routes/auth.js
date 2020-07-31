var express = require('express');

const routesAuth = express.Router();
const authController = require('../controllers/authController');

routesAuth.post('/login',  authController.login);

routesAuth.post('/register', authController.register);

routesAuth.delete('/logout', authController.logout)

module.exports = routesAuth;