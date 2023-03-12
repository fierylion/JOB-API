const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message|| "Something went wrong, Please try again later"
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if(err.name && err.name==="ValidationError"){
    customError.msg = Object.values(err.errors)
                        .map((item)=>item.message)
                        .join(" , ");
    customError.statusCode= StatusCodes.BAD_REQUEST;
  }
  if(err.name && err.name === "CastError"){
    customError.msg = `No item with the id ${err.value}`
    customError.statusCode = StatusCodes.BAD_REQUEST;

  }
  if(err.code && err.code===11000){
    customError.msg = `Duplicate values entered for ${Object.keys(err.keyValue)} please choose another value`
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({err: customError.msg})
}

module.exports = errorHandlerMiddleware
