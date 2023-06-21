const deleteImages = require('../utils/removeImage');
const cloudinary = require('../utils/cloudinary');
const { v4: uuidv4 } = require("uuid");
const { Op } = require('sequelize');
const { Sequelize} = require('sequelize');
const Size = require('../services/size');
const Product = require('../services/product');
const Order = require('../services/order');

class product{

  // create new product
  static async create(req, res) {

    const { name , des } = req.body || req.params;
    if( !name || !des) res.send({
      msg: 'Data not enought!',
      err: 1
    })

    // upload image to cloud
    const imageUpload = await cloudinary.uploadImage(req.file.path);

    // excute query
    const result = await Product.create({
      ID: uuidv4(),
      NAME: name,
      THUMBNAIL: imageUpload.url,
      THUMBNAIL_ID: imageUpload.id,
      DES: des
    })
    deleteImages();
    
    return result;
  }

  // get all product
  static async getList() {
    return await Product.findAll({
      limit: 8
    });
  }

  // get product limit
  static async getProductLimit(condition ,limit){

    const result = await Product.findAll({
      where: {
        NAME: {
          [Op.like]: '%'+condition+'%'
        }
      },
      limit: limit
    })

    return result
    
  }
  
  //get single product
  static async getProductById(req, res) {
    const { id } = req.params || req.query || req.body;
    if(!id) res.send({
      msg: 'Id is not empty!',
      err: 1
    })

    const result = await  Product.findOne({
      where: {
        ID: id
      }
    })
    return result;
  
  }

  //get size product
  static async getSize() {
    const result = await Size.findAll();
    return result;
  }

  // get product by id from session cart
  static async getProductByCartSession(req, res){
    try {
      const carts = req.session.cart || [];
      const result = await Promise.all(
        carts.map(async (item) => {
          const product = await Product.findOne({
            where: {
              ID: item.id
            }
          })
          
          //spread item, product
          return {...item, ...product.dataValues};
        })
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  // remove product by id
  static async remove(req, res){
    const { id } = req.params || req.body;
    const { thumbnailId } = req.query;
    if(!id) res.send({
      msg: 'ID is not empty!',
      err: 1
    });

    // remove image in cloud
    if(thumbnailId) cloudinary.destroyImage(thumbnailId);

    // check product in orders table
    const product = await Order.findOne({
      where: {
        PRODUCT_ID: id
      }
    })

    if(product) return res.send({
      msg: 'Can not remove product! Product is being Orders!',
      err: 0
    })

    const result = Product.destroy({
      where: {
        ID: id
      }
    })

    return result;
  }

  // update (post) product by id
  static async update(req, res){
    const {name, des, thumbnailId } = req.body || req.params;
    const id  = req.params.id || req.body.id; 
    if( !id ) return res.send({
      msg: 'ID is not empty',
      err: 1
    })

    const fileImage = (req.file) ? req.file.path : null;
    if(fileImage) cloudinary.destroyImage(thumbnailId);
    const imageUpload = ( fileImage ) ? await cloudinary.uploadImage(fileImage) : null;
  
    const result = Product.update(
      {
        NAME: name ? name : Sequelize.literal('NAME'),
        DES: des ? des : Sequelize.literal('DES'),
        THUMBNAIL: imageUpload ? imageUpload.url : Sequelize.literal('THUMBNAIL'),
        THUMBNAIL_ID: imageUpload ? imageUpload.id : Sequelize.literal('THUMBNAIL_ID'),
      },
      {
      where: {
        ID: id
      }
    })

    return result;
  }

  // edit (get) prouct by id
  static async edit(req, res){
    const id  = req.body.id || req.params.id;
    if(!id) return res.send({
      mes: 'ID is not empty',
      err: 1
    })

    const product = await Product.findOne({
      where: {
        ID: id
      }
    })

    if(!product) return res.send({
      msg: 'Product is not exits!',
      err: -1
    })

    return product;
  }

  // filter
  static async filter(req, res){
    const { sort, name, page } = req.query || req.params;

    const filters = {
      where: {
        name: {
          [Op.like]: (name) ? '%'+name+'%' : '%',
        }
      },
      limit: 8,
      offset: (page) ? 8*page - 8 : 0,
    };

    const result = await Product.findAll(filters);
    return result;

  }
}


module.exports = product;
