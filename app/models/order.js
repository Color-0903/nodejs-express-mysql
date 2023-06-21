const Order = require("../services/order");
const User = require("../services/user");
const Product = require("../services/product");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { _token } = require('../utils/token');

// create new order
async function create(req, res) {
  const carts = req.session.cart || [];
  const { fullName, phone, address, note, totalPrice } = req.body || req.params;

  if (!fullName || !phone || !address)
    res.render("/cart/index", {
      layout: "layouts/user",
      notificaton: {
        messenger: "Thiếu dữ liệu ",
        type: "warning",
      },
    });

  const token = _token(req, res, false) ;
  const name = token.name ? token.name : null;

  carts.forEach((element) => {
    const sizeQuantity = element.size
      .map((item) => item.size + "(" + item.quantity + ")")
      .toString();

    const newRecord = Order.create({
      ID: uuidv4(),
      PRODUCT_ID: element.id,
      SIZE: sizeQuantity,
      PRICE: totalPrice,
      NAME: name,
      FULLNAME: fullName,
      PHONE: phone,
      ADDRESS: note + ", " + address,
    });
  });

  delete req.session.cart;
}

// get order user
async function getOrders(req, res) {
  const token = _token(req, res, false);

  const name = token.name ? token.name : null;

  User.hasMany(Order, { foreignKey: "Name" });
  Order.belongsTo(User, { foreignKey: "Name" });

  Product.hasMany(Order, { foreignKey: "PRODUCT_ID" });
  Order.belongsTo(Product, { foreignKey: "PRODUCT_ID" });

  const results = await new Promise((resolve, reject) => {
    Order.findAll({
      include: [
        {
          model: User,
          attributes: ["FULLNAME", "PHONE", "ADDRESS"],
        },
        {
          model: Product,
          attributes: ["NAME", "THUMBNAIL", "DES"],
        },
      ],
      where: {
        NAME: name,
      },
    })
      .then((orders) => {
        resolve(orders);
      })
      .catch((error) => {
        reject(error);
      });
  });
  let orders = [];
  let history = [];
  results.forEach((element) => {
    element.STATUS >= 0 ? orders.push(element) : history.push(element);
  });
  return {
    orders,
    history,
  };
}
module.exports = {
  create,
  getOrders,
};
