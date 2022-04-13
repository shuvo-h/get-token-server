// external imports
const express = require("express");
const { addNewUser, doUserLogin, logout } = require("../controller/Authentication/authenticationController");
const { addUserValidator, addUserValidationHandler } = require("../middleware/authenticate/authenticateValidator");
const { doLoginValidator, doLoginValidationHandler } = require("../middleware/authenticate/loginValidator");
const { uploadImage } = require("../middleware/imageUploader/uploadImage");
const router = express.Router();
// internal imports

// registration route path 
router.post("/registration",uploadImage,addUserValidator,addUserValidationHandler,addNewUser)

// login route path 
router.post("/login",doLoginValidator,doLoginValidationHandler,doUserLogin)

// logout
router.delete("/",logout)

module.exports = router;