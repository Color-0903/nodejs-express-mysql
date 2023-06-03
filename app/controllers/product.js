const product = require("../models/product");



exports.list = (req, res) => {
  res.render("product/list", { layout: "layouts/admin" });
};

exports.create = (req, res) => {
  res.render("product/create", { layout: "layouts/admin" });
};
exports.createNew = async (req, res) => {
  const creteNew = await product.create(req);
  res.render("product/create", { layout: "layouts/admin" });
};

exports.update = (req, res) => {
  product.update(req, res);
  res.render("product/create", { layout: "layouts/admin" });
};
exports.detail = (req, res) => {
  res.render("product/detail", { layout: "layouts/users" });
};
