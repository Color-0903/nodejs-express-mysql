  const product = require("../controllers/product.js");
  const routes = require("express").Router();
  const upload = require('../middlewares/multer.js');


  // product router
  routes.get("/product/list", product.list);
  routes.get("/product/create", product.create);
  routes.post("/product/create",upload.single('image'), product.createNew);

module.exports = routes;
