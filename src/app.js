const express = require('express');
const bot = require("./utils/venomBot")
const fs = require("fs")
const db = require('./database');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000);

module.exports = app;