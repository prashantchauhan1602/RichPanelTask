// importing required packages
const router = require("express").Router()
const {body} = require("express-validator")

// importing controllors
const {login,signup} = require("../controllors/auth")
const { validateInputRequest } = require("../middlewares/auth")

// @DESC: Route to handle incoming signup request
router.post("/signup",
            body("email").isEmail().withMessage("Please Provide valid Email !"),
            body("password").isStrongPassword().withMessage("Password is weak !"),
            body("name").exists().withMessage("Please Provide Name").isLength({min:1}).withMessage("Please Provide valid name"),
            validateInputRequest,
            signup)


// @DESC: Route to handle incoming login request
router.post("/login",
            body("email").isEmail().withMessage("Please Provide valid Email !"),
            body("password").exists().withMessage("Password must be provided !"),
            validateInputRequest,
            login)


module.exports = router
