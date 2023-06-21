const product = require('../models/product');

exports.list = async (req, res) => {
  const list = await product.getList();
  console.log(list);
  res.render("product/list", { layout: "layouts/admin", products: list });
};

exports.create = (req, res) => {
  res.render("product/create", { layout: "layouts/admin", spinner: true });
};

exports.createNew = async (req, res) => {
  const createNew = await product.create(req, res);
  res.redirect("/product/create");
};

exports.detail = async (req, res) => {
  try {
    const single = await product.getProductById(req, res);

    const size = await product.getSize();

    const related = await product.getProductLimit('', 4);

    if(!single) res.redirect("/");

    res.render("product/detail", { layout: "layouts/users", product: single, size: size, related: related });

  } catch (error) {
    console.log(error);
  }

};

exports.remove = async(req, res) => {

  const result = await product.remove(req, res);
  res.redirect("/product/list");
}

// get
exports.edit = async(req, res) => {
  const result = await product.edit(req, res);
  res.render("product/edit", { layout: "layouts/admin", product: result, spinner: true  });

}

//post
exports.update = async(req, res) => {
  const result = await product.update(req, res);
  res.redirect("/product/list");
}

exports.filter = async(req, res) => {
  const result = await product.filter(req, res);
  res.render("index", { layout: "layouts/users", products: result });
}



