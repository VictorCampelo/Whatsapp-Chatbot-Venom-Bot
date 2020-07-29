const Router = require('express');
const fs = require("fs")
const userController = require('../controllers/userController');

const routesUser = Router();

routesUser.post('/users', userController.create);
routesUser.get('/users', userController.read);
routesUser.put('/users/:id', userController.update);
routesUser.delete('/users/:id', userController.delete);

// CREATE A QRCODE IMAGE TO USER DYNAMICALLY

routesUser.get('/users/qrcode', (req, res) => {
    var img = fs.readFileSync('./utils/files/marketing-qr.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  });

module.exports = routesUser;