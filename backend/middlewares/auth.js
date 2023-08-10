const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")

// @DESC: it will verify incoming request is authenticated and token provided is valid
const isLoggedIn = (req,res,next) => {
    const token = req.headers["authorization"]
    try {
        var decoded = jwt.verify(token,process.env.SECRET)
        req.user  = decoded;
        next();
    }
    catch(err) {
        return res.status(401).json({success: false, message:err.message})
    }
}

// @DESC: it will validate the req data by provided rule
const validateInputRequest = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(404).json({message: errors.array()[0].msg,success: false})
    }
    next()
}

module.exports = {isLoggedIn,validateInputRequest}