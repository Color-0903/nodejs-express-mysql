const deleteImages = require("../middlewares/removeImage");
const ggDriver = require("../models/ggDriver");

class product {
  static async create(req) {
    try {
      const drive = new ggDriver();
      const imageUpload = await drive.uploadImage(
        req.file.path,
        req.file.originalname
      );
      deleteImages();
      return true;
    } catch (error) {
      return error;
    }
  }
}

module.exports = product;
