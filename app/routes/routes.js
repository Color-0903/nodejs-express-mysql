const routes = require("express").Router();
const product = require("../controllers/product.js");
const home = require("../controllers/home.js");
const cart = require("../controllers/cart.js");
const user = require("../controllers/user.js");
// middleware
const upload = require("../middlewares/multer.js");
const { validatePhoneNumber } = require("../middlewares/validate.js");
const { auth } = require('../middlewares/auth.js');
const passport = require('passport');

// product router
routes.get("/product/list", auth, product.list);
routes.get("/product/create",auth, product.create);
routes.post("/product/create",auth, upload.single("image"), product.createNew);
routes.get("/product/remove/:id",auth, product.remove);
routes.get("/product/edit/:id",auth, product.edit);
routes.post("/product/edit/:id",auth, upload.single("image"), product.update);

routes.get("/product/detail/:id", product.detail);
routes.get("/product/filter", product.filter);

// cart
routes.get("/cart", cart.index);
routes.post("/cart/add", cart.add);
routes.get("/cart/remove/:id", cart.remove);
routes.post("/cart/checkout",validatePhoneNumber , cart.checkout);

// user router
routes.get("/profile/dashboard", user.dashboard);
routes.post("/profile/update", user.update);

routes.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);
routes.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),user.google
);
routes.get("/authen/register", user.register);
routes.post("/authen/register", user.regisNew);
routes.get("/authen/login", user.login);
routes.post("/authen/login", user.loginNew);
routes.get("/authen/logout", user.logout);

// home
routes.get("/", home.index);
routes.get("/home/about", home.about);

module.exports = routes;
