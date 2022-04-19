const Hotels = require("../../models/Hotels");

async function addNewHotel(req,res,next) {
    newHotel = new Hotels(req.body); 
    try {
        const result = await newHotel.save();
        res.status(200).json({result})

    } catch (err) {
        res.status(500).json({
            errors:{
                common:{msg: "Unknown error occured!"}
            }
        })
    }
}

module.exports ={
    addNewHotel,
}