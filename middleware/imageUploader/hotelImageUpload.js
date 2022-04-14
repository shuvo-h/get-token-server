const { uploadOneImage } = require("../../utilities/singleImageUploader");

const uploadHotelImgae = async function (req,res,next) {
    const images = req.body?.img_uri;
    if (images.length) {
        const images_URIs = images.map(img=>{
            const uriAndId = uploadOneImage(img);
            if (uriAndId.url && uriAndId.cloud_id) {
                return uriAndId;
            }else{
                return
            }
        })
        req.body.img_uri = images_URIs;
        next();
    }else{
        next();
    }
}

module.exports = {
    uploadHotelImgae
}