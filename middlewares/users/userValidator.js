// external imports 
const {check, validationResult} = require("express-validator");
const createError = require("http-errors");

// add user validation
const addUserValidators = [
    check("name")
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore:" -"})
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async(value)=>{
            try{
                const user = await User.findOne({email:value});
                if (user) {
                    throw createError("Email already exist!")
                }
            }catch(err){
                throw createError(err.message);
            }
        }),
    check("mobile")
        .isMobilePhone("bn-BD",{strictMode:true})
        .withMessage("Mobile number must be a valid Bangladeshi mobile number")
        .custom(async(value)=>{
            try {
                const user = await User.findOne({mobile:value});
                if (user) {
                    throw createError("Mobile already used!")
                }
            } catch (err) {
                throw createError(err.message)
            }
        }),
    check("password")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long and should contain 1 lowercase, 1 uppercase, 1 number & 1 symbol")

];

const addUserValidationHandler = function (req,res,next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();     //mappedErrors = {name:{msg:"Name is required"},email:{"Invalid email address"}}
    if (Object.keys(mappedErrors).length === 0) {
        next();
    }else{
        // remove uploaded file 
        if (req.files.length > 0) {
            const {filename} = req.files[0];
            // delete the uploaded file from cloudinary 
        }

        // response the errors
        res.status(500).json({errors: mappedErrors})
    }
}

module.exports = {
    addUserValidators,
    addUserValidationHandler
}