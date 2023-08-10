// importing required packages
const User = require("../modals/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// @ENDPOINT: /auth/login
// @METHOD: POST
// @DESCRIPTION: Handles incoming login request. Sign token if credentials are valid
const login = (req,res) => {
    const {email,password} = req.body;

    // check if account exits
    User.findOne({email: email})
    .then(user => {

        if(!user )
        {
            return res.status(401).json({success: false,message:"Email not Found"})
        }
        // else check the password
        bcrypt.compare(password, user.password, function(err, result) {
         
            if(result == true)
            {
                const token = jwt.sign({
                    _id: user._id,
                    email: user.email
                },process.env.SECRET,{ expiresIn: '1h' })

                return res.status(200).json({success: true,token: token,name: user.name, email: user.email})
            }
            else
            {
                return res.status(401).json({success: false, message:"Invalid Password"})
            }
        });
    })
    .catch( () => res.status(500).json({success: false, message:"Something Went Wrong!"}))

}

// @ENDPOINT: /auth/signup
// @METHOD: POST
// @DESCRIPTION: Handles incoming signup request. After validating data add the user in database
const signup = (req,res) => {

    const {email,password,name} = req.body;

    // check if user with given email already exists
    User.findOne({email: email})
    .then((user)=> {
        if(user)
        {
            return res.status(404).json({"success":false,"message":"Account with this email already exists."})
        }
        // hash the password
        bcrypt.hash(password,10, (err,hashedPass)=> {
            if(err)
            return res.status(500).json({"success":false,"message":err.message})

            // creating new user
            const newUser = new User({name,email,password: hashedPass})
            
            newUser.save()
            .then(() =>  res.status(200).json({success: true, message:"Account Created Successfully"}))
            .catch(err => res.status(500).json({"success":false,"message": err.message}))

        })
      
    })
    .catch(err => res.status(500).json({"success":false,"message":"Some error occured please try again."}))
}

module.exports = {login, signup}