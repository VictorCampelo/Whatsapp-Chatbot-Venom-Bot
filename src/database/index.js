'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database');

const Client = require('../models/Client')
const User = require('../models/User');
const Product = require('../models/Product');
const Stage_Response = require('../models/Stage_Response');
const Order = require('../models/Order');

const connection = new Sequelize(config);


// CONNECTION
Client.init(connection)
User.init(connection)
Product.init(connection)
Stage_Response.init(connection)
Order.init(connection)

//Creating with Associations
User.associate(connection.models)
Product.associate(connection.models)
Stage_Response.associate(connection.models)
Client.associate(connection.models)
Order.associate(connection.models)

// User.Addresses = User.hasMany(Address);

module.exports = connection