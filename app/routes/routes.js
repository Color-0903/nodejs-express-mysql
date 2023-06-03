  const product = require("../controllers/product.js");
  const home = require("../controllers/home.js");
  const routes = require("express").Router();
  const upload = require('../middlewares/multer.js');


  // product router
  routes.get("/product/list", product.list);
  routes.get("/product/create", product.create);
  routes.post("/product/create",upload.single('image'), product.createNew);
  routes.get("/product/detail", product.detail);


  // home
  routes.get("/", home.index);
  
module.exports = routes;
