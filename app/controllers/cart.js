const product = require('../models/product');
const order = require('../models/order');
const { insertToSessionCart, removeItemInSessionCart } = require('../utils/cartSession');
const { _token } = require('../utils/token');

exports.index = async (req, res) => {
    const carts = await product.getProductByCartSession(req, res);
    const totalPrice = carts.reduce((acc, item) => acc + item.price, 0);
    const token = _token(req, res, false);
    res.render("cart/index", { layout: "layouts/users", carts: carts, totalPrice: totalPrice, data:token });
  };

exports.add = async (req, res) => {
    try {
      if(req.body.size){
  
        const newOrder = {
          id: req.body.id,
          size: req.body.size.split("&")[0],
          quantity: req.body.quantity,
          price: req.body.size.split("&")[1] * req.body.quantity,
        }
        const result = await insertToSessionCart(req, newOrder);
  
        res.redirect("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  
  };
  
  exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
      if(id){
        const carts = await removeItemInSessionCart(req, id);
  
        res.redirect("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  
  };
  
  exports.checkout = async (req, res) => {
    try {
      const result = await order.create(req, res);
      res.render("status/success", { layout: "layouts/users"});
    } catch (error) {
      console.log(error);
    }
  
  };