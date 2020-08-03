const express = require('express');
//const bot = require("./utils/venomBot")
const db = require('./src/database');
const routesUsers = require('./src/routes/users');
const routesIndex = require('./src/routes/index');
const routesAuth = require('./src/routes/auth');
const bodyParser = require('body-parser');

var http = require('http');  
var cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

app.use(express.json());

app.use(routesIndex);
app.use(routesUsers);
app.use(routesAuth);

var server = http.createServer(app); 
// server.listen(3000, '192.168.0.8');
server.listen(3000);
console.log("Servidor escutando na porta 3000...")

module.exports = app;