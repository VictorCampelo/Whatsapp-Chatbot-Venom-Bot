const express = require('express');
//const bot = require("./utils/venomBot")
const db = require('./src/database');
const routesUsers = require('./src/routes/users');
const routesIndex = require('./src/routes/index');
const routesAuth = require('./src/routes/auth');
const bodyParser = require('body-parser');

var http = require('http');  
var cookieParser = require('cookie-parser');
const routesProduct = require('./src/routes/product');
const routesStages = require('./src/routes/stages');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

app.use(express.json());

app.use(routesIndex);
app.use(routesUsers);
app.use(routesAuth);
app.use(routesProduct);
app.use(routesStages);


var server = http.createServer(app); 
// server.listen(3000, '192.168.0.8');

const port = process.env.PORT || 3000;

server.listen(port);
console.log("Servidor escutando na porta 3000...")

module.exports = app;