'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database');

const Client = require('../models/Client')
const User = require('../models/User')

const connection = new Sequelize(config);

Client.init(connection)
User.init(connection)

module.exports = connection