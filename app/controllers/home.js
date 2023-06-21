const product = require("../models/product");

exports.index = async (req, res) => {
  const list = await product.getList();
  res.render("index", { layout: "layouts/users", products: list });
};

exports.about = (req, res) => {
  res.render("home/contact", { layout: "layouts/users" });
};