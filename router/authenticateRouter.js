// external imports
const express = require("express");
const { addNewUser } = require("../controller/Authentication/authenticationController");
const { addUserValidator, addUserValidationHandler } = require("../middleware/authenticate/authenticateValidator");
const router = express.Router();
// internal imports

// login route path 
router.post("/registration",addUserValidator,addUserValidationHandler,addNewUser)

module.exports = router;