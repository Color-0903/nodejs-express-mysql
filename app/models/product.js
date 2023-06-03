const deleteImages = require("../middlewares/removeImage");
const ggDriver = require("../models/ggDriver");
const DB = require('./db');

class product{
  constructor(){
    console.log('this is product contructor');
  }
  static async create(req) {
    try {
      const drive = new ggDriver();
      const imageUpload = await drive.uploadImage(
        req.file.path,
        req.file.originalname
      );
      deleteImages();

      let db = new DB();
      // data
      const data = await db.excuteNonQuery("select * from feedback");
      console.log(data);
      console.log(req.body);
      console.log(imageUpload);
      
      return true;
    } catch (error) {
      return error;
    }
  }
}

module.exports = product;
