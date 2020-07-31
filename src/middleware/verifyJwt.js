const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('../helpers/init_redis')

module.exports = {
  verifyAccessToken: (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.ACCESS_TOKEN_SECRET
    
    if(!token) res.status(401).json("Access Danied")
    try {
      JWT.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            return res.status(401).json(err)
          }
          const userId = user.id
          client.GET(userId, (err, result) => {
            if (err) {
              console.log(err.message)
              return res.status(401).json(err)
            }
            if (token === result) { 
              next();
            }else res.status(401).json(createError.Unauthorized())
          })
        }
      )
    } catch (error) {
      res.status(400).json("Invalid Token")
    }
  },
  
  signAccessToken: (params) => {
    return new Promise((resolve, reject) => {
      JWT.sign(
        params, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: '1d'},
        (err, token) => {
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
        expiresIn: '1y',
        issuer: 'pickurpage.com',
      }
      JWT.sign(params, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          // reject(err)
          reject(createError.InternalServerError())
          return 
        }
        // resolve(token)
        const userId = params.id
        console.log(token)
        client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
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
              reject(createError.InternalServerError())
              return
            }
            if (refreshToken === result) return resolve(userId)
            reject(createError.Unauthorized())
          })
        }
      )
    })
  },
}