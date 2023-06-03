const home = require("../models/home");



exports.index = (req, res) => {
  res.render("index", { layout: "layouts/users" });
};