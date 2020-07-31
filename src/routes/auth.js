var express = require('express');
const fs = require("fs")
const routesAuth = express.Router();
const userController = require('../controllers/userController');
const { nextTick } = require('process');
const { create } = require('../models/User');
const createHttpError = require('http-errors');
const { verifyRefreshToken, signAccessToken, signRefreshToken } = require('../middleware/verifyJwt');
const client = require('../helpers/init_redis')

routesAuth.post('/login',  userController.login);

routesAuth.post('/register', userController.create);

routesAuth.delete('/logout', async function(req, res, next) {
    try {
        const refreshToken = req.body
        if (!refreshToken) throw createHttpError.BadRequest()

        const userId = await verifyRefreshToken(refreshToken.refresh_token)
        client.DEL(userId, (err, val) => {
          if (err) {
            console.log(err.message)
            res.status(400).json(createError.InternalServerError())
          }
          console.log(val)
          res.status(200).json("User logout")
          next();
        })
      } catch (error) {
        next(error)
      }
})

routesAuth.post('/refresh-token', async function(req, res, next) {
    try {
        const refresh = req.body
        if (!refresh) {
            throw createHttpError.BadRequest()
        }
        const userId = await verifyRefreshToken(refresh.refresh_token)

        const accessToken = await signAccessToken({id: userId})
        const refreshToken = await signRefreshToken({id: userId})

        res.status(200).json({"accessToken": accessToken, "refreshToken": refreshToken})
    } catch (error) {
        next(error)
    }
})

module.exports = routesAuth;