const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require('bcryptjs')
const db = require("../db/userDB.js")
const utils = require('../lib/utils.js')
const AppError = require('../appError/AppError.js');

const validateUser = [
  
// Option 2 — add username and password to your validateUser array
body("username").trim().trim()
    .notEmpty()
    .withMessage("Name can not be empty.")
    .isAlpha()
    .withMessage("Name must only contain alphabet letters.")
    .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters"),
body("password").trim()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

];

async function signUser (req, res, next){
    const {username, password} = req.body
     const errors = validationResult(req);
   
      if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
        const user = await db.createUser(username, password)
        res.json({success:true, user: user})
    }
    catch(error){
       console.log("Caught error:", error);
  if (error.code === "P2002") {
    return next(new AppError("Username already taken", 409));
  }

  next(error);
    }

}

async function loginUser(req, res, next){
    const {username, password} = req.body
    try{
        const user = await db.findUser(username)
        if(!user){
                throw new AppError(`couldn't find user`, 404)
                
                }
         const match = await bcrypt.compare(password, user.password)
         if (!match) {
            throw new AppError("Invalid username or password", 401)
           
        }
        
        const tokenObject = utils.issueJWT(user)
        
        res.status(200).json({ 
            success: true,
            token: tokenObject.token, 
            expiresIn: tokenObject.expires 
        })
    }
    catch(error){
        console.log('error', error)
        next(error)
    }
}

module.exports= {
    signUser,
     loginUser,
     validateUser
}