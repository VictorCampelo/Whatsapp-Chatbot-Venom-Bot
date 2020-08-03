const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('../helpers/init_redis')

const jwt_expiration = 10 * 60 * 1000;
const jwt_refresh_expiration = 60 * 60 * 24 * 30; //30 days

module.exports = {  
  signAccessToken: (params) => {
    return new Promise((resolve, reject) => {
      JWT.sign(params, process.env.ACCESS_TOKEN_SECRET, {expiresIn: jwt_expiration}, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
          return
        }
        resolve(token);
      });
    });
  },
  
  signRefreshToken: (params) => {
    return new Promise((resolve, reject) => {
      const secret = process.env.REFRESH_TOKEN_SECRET
      const options = {
        expiresIn: jwt_refresh_expiration
      }
      JWT.sign(params, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
          return 
        }
        const userId = params.id
        client.SET(userId, token, 'EX', jwt_refresh_expiration, (err, reply) => {
          if (err) {
            console.log(err.message)
            reject(createError.InternalServerError())
            return
          }
          resolve(token)
        })
      })
    })
  },
  
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            return reject(createError.Unauthorized())
          }
          const userId = user.id
          client.GET(userId, (err, result) => {
            if (err) {
              console.log(err.message)
              return reject(createError.InternalServerError())
            }
            if (refreshToken === result){
              return resolve(userId)
            } 
            else{
              return reject(createError.Unauthorized())
            }
          })
        }
        )
      })
    },
}