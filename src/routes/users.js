const Router = require('express');
const fs = require("fs")
const userController = require('../controllers/userController');
const {verifyAccessToken} = require('../middleware/verifyJwt');
const routesUser = Router();

routesUser.post('/users', verifyAccessToken, userController.create);
routesUser.get('/users', verifyAccessToken, userController.read);
routesUser.get('/authusers', verifyAccessToken, userController.readAuth);
routesUser.put('/users/:id', verifyAccessToken, userController.update);
routesUser.delete('/users/:id', verifyAccessToken, userController.delete);

// CREATE A QRCODE IMAGE TO USER DYNAMICALLY

routesUser.get('/users/qrcode', (req, res) => {
    var img = fs.readFileSync('./src/utils/files/marketing-qr.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  });

module.exports = routesUser;