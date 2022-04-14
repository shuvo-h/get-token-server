async function addNewHotel(req,res,next) {
    try {
        console.log(req.body,"Inser the hotel info through mongoose");
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