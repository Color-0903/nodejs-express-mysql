const cloudinary = require('cloudinary').v2;
const config = require('../config/cloudinary');

cloudinary.config(config);

async function uploadImage (imagePath){
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        console.log(result.url);
        return {
            url: result.url,
            id: result.public_id
        }
    } catch (error) {
        throw error;
    }
}

async function destroyImage(imageId){
    try {
        const result = await cloudinary.uploader.destroy(imageId);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    uploadImage,
    destroyImage
}