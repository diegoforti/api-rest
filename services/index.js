'uses strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config.js')

function createToken(User){
    const payload = {
        //No utilizar el _id de la bd.
        sub: user._id,
        iat: moment.unix(),
        exp: moment().add(14, 'days').unix(),
    }

   return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (tooken){
    const decoded = new Promise((resolve, reject) =>{
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: `El mensaje ha expirado`
                })
            }
            
            resolve(payload.sub)

        }catch(err){
            reject({
                status: 500,
                message: `Invalid Token`
            })
        }
    })
    return decode
}

module.exports = {
    createToken,
    decodeToken
}