// external imports
const express = require("express");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidator");

const router = express.Router();

// add new user 
router.post("/", avatarUpload,addUserValidators, addUserValidationHandler,addUser);

module.exports = router;