const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('../helpers/init_redis')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require("./verifyJwt")

const jwt_expiration = 30;
const jwt_refresh_expiration = 60 * 60 * 24 * 30;

module.exports = {
  async verifyAccessToken (req, res, next) {
    const token = req.body.accessToken;
    const refreshToken = req.body.refreshToken;
    const secret = process.env.ACCESS_TOKEN_SECRET
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET
    
    if(!token) res.status(401).json("Access Danied")
    
    try {
      JWT.verify(token, secret, async (err, user) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            console.log(err.message)

            try {
              const userId = await verifyRefreshToken(refreshToken);
              
              let redis_token = client.get(userId, function(err, val) {
                return err ? null : val ? val : null;
              });
              
              if (!redis_token || redis_token === refreshSecret) {
                return res.status(401).json("nice try")
              }
              else {
                // It can also happen that the refresh token expires; in that case
                // we need to issue both tokens at the same time
                let expires = client.TTL(userId)
                if (expires === 0) {
                  // refresh token expired, we issue refresh token as well
                  let refresh_token = signRefreshToken({id: user.id})
                  
                  client.SET(userId, refresh_token, 'EX', jwt_refresh_expiration, (err, reply) => {
                    if (err) {
                      return res.status(401).json(err.message)
                    }
                  })
                }
                
                res.status(201).header({ 
                  accessToken: await signAccessToken({id: userId})
                });
                next();
              }
            } catch (error) {
              return res.status(401).json(error)
            }
          }
          else {
            // If any error other than "TokenExpiredError" occurs, it means
            // that either token is invalid, or in wrong format, or ...  
            return res.status(401).json(err)
          }
          return res.status(401).json(err)
        }
        else {
          const userId = user.id
          client.GET(userId, (err, result) => {
            if (err) {
              console.log(err.message)
              return res.status(401).json(err)
            }
            if(!result){
              return res.status(401).json("User is logouted")
            }
            console.log(result)
            req.userId = user.id
            next();
          })
        }
      })
    } catch (error) {
      console.log(error)
      res.status(400).json("Invalid Token")
    }
  }
}