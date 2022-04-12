// external imports 
const bcrypt = require("bcrypt");
const { deleteImage } = require("../../middleware/imageUploader/uploadImage");
// internal imports 
const User = require("../../models/people")

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

module.exports = {
    addNewUser
}