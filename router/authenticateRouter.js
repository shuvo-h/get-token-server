// external imports
const express = require("express");
const { addNewUser } = require("../controller/Authentication/authenticationController");
const { addUserValidator, addUserValidationHandler } = require("../middleware/authenticate/authenticateValidator");
const { uploadImage } = require("../middleware/imageUploader/uploadImage");
const router = express.Router();
// internal imports

// login route path 
router.post("/registration",uploadImage,addUserValidator,addUserValidationHandler,addNewUser)

module.exports = router;