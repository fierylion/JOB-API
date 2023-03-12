const jwt = require('jsonwebtoken')

const {UnauthenticatedError} = require('../errors')

require('dotenv').config()

const validateTokenMiddleware =async (req,res,next)=>{
    const authorization = req.headers.authorization;
    if(!authorization) throw new UnauthenticatedError('Invalid access');
    try{
        const token = authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        const {id, name} = decode;
        req.user = {id, name};
        next();
    }
    catch(err){
        throw new UnauthenticatedError("Invalid Access")
    }
    

}
module.exports = validateTokenMiddleware;