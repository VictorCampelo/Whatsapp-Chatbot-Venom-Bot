const express = require('express');
const bot = require("./utils/venomBot")
const fs = require("fs")
const db = require('./database');
const routes = require('./routes');
const bodyParser = require('body-parser');

var http = require('http');  
var cookieParser = require('cookie-parser'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(routes);

var server = http.createServer(app); 
server.listen(3000);
console.log("Servidor escutando na porta 3000...")

module.exports = app;