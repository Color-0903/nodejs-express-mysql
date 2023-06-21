const User = require('../models/user');
const Order = require('../models/order');

// register get
exports.register = (req, res) => {
  res.render("authen/register", { layout: "layouts/free" });
};

// register post
exports.regisNew = async (req, res) => {
  const { user, created } = await User.register(req, res);
  res.redirect("/profile/dashboard");
};

// login get
exports.login = (req, res) => {
  res.render("authen/login", { layout: "layouts/free" });
}

// login post
exports.loginNew = async (req, res) => {
  const { user, token } = await User.login(req, res);
  user.ROLE == 1 ? res.redirect("/product/create") : res.redirect("/profile/dashboard");
}

//
exports.google = async (req, res) => {
  const result = await User.google(req, res);
  res.redirect("/profile/dashboard");
  };

  //
exports.dashboard = async (req, res) => {
    const user = await User.dashboard(req, res);
    console.log(user);
    const {orders, history} = await Order.getOrders(req, res);

    res.render("user/dashboard", { layout: "layouts/users", user: user, orders: orders, history: history });
  };

  //
  exports.update = async (req, res) => {
    const user = await User.update(req, res);
    res.redirect("/profile/dashboard");
  };

    //
exports.logout = async (req, res) => {
      User.logout(req, res);
      res.redirect("/authen/login");
    };