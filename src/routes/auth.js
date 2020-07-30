var express = require('express');
const fs = require("fs")
const routesAuth = express.Router();
const userController = require('../controllers/userController');

routesAuth.post('/login',  userController.login);

routesAuth.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

routesAuth.post('/register', userController.create);

module.exports = routesAuth;