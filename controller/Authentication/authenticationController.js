// external imports 
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { deleteImage } = require("../../middleware/imageUploader/uploadImage");
// internal imports 
const User = require("../../models/People")

// add a new user as registration 
async function addNewUser(req,res,next) {
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    newUser = new User({...req.body,password:hashedPassword})
    
    // save user to DB or send error 
    try {
        const result = await newUser.save();
        res.status(200).json({message:"User was added successfully!"})
    } catch (err) {
        if (newUser.avatar_id) {
            deleteImage(newUser.avatar_id);
        }
        res.status(500).json({
            errors:{
                common:{msg: "Unknown error occured!"}
            }
        })
    }
}

// do login 
async function doUserLogin(req,res,next) {
    try {
        const user = await User.findOne({email:req.body?.email})
        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(req.body.password,user.password);
            if (isValidPassword) {
                // prepare the user object to generate token 
                const userObject = {
                    name : user.name,
                    mobile: user.mobile,
                    email: user.email,
                    img: user.avatar,
                    role: user.role || "user" 
                }
                
                // generate token 
                const token = jwt.sign(userObject,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})
                // console.log(token);

                // set cookie 
                res.cookie(process.env.COOKIE_NAME,token,{
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true
                }).json(userObject)
            }else{
                throw createError("Login failed. please try again!")
            }
        }else{
            throw createError("Login failed. Please try again!")
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            email: req.body.email,
            message: "Login failed!"
        })
    }
}

// do logout 
function logout(req,res) {
    res.clearCookie(process.env.COOKIE_NAME)
    .json({message:"logout successful!"});
}

module.exports = {
    addNewUser,
    doUserLogin,
    logout
}