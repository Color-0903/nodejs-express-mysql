require('dotenv').config();

module.exports = {
  secret:  process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Đặt secure thành true nếu sử dụng HTTPS
};
