const express = require('express');
//const bot = require("./utils/venomBot")

const db = require('./database');
const routesUsers = require('./routes/users');
const routesIndex = require('./routes/index');
const bodyParser = require('body-parser');

var http = require('http');  
var cookieParser = require('cookie-parser'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(routesIndex);
app.use(routesUsers);

var server = http.createServer(app); 
server.listen(3000);
console.log("Servidor escutando na porta 3000...")

module.exports = app;