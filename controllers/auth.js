const User = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')
const registerUser = async (req, res)=>{
    const user = await User.create({...req.body})
    const token = user.createJwt();
    res.status(StatusCodes.CREATED).json({name:user.name, token})
}
const login =async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email and password!')
    }

    const user = await User.findOne({email});
    
    if(!user) throw new UnauthenticatedError('Provided Email is doesnt exist');
    const isMatch = await user.verifyPassword(password);
    

    if(!isMatch) throw new UnauthenticatedError('Provided password is wrong!')
    const token =user.createJwt();

    res.status(StatusCodes.OK).json({user: user.name, token})

}

module.exports = {
    registerUser,
    login
}