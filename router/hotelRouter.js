// external imports 
const express = require("express");
const { addNewHotel } = require("../controller/hotels/hotelController");
const { uploadHotelImgae } = require("../middleware/imageUploader/hotelImageUpload");
// internal imports 

const router = express.Router();
// uploadHotelImgae
// add new hotel router 
router.post("/hotel",uploadHotelImgae,addNewHotel)

module.exports = router;