require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Thiết lập session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Cấu hình Passport để sử dụng Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken');
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    // Xử lý thông tin người dùng đăng nhập thành công
    // profile chứa thông tin của người dùng
    // done là hàm để hoàn thành quá trình xác thực
    // và chuyển hướng người dùng đến trang tùy chỉnh của bạn.
    return done(null, profile);
  }
));

// Cấu hình Passport để lưu thông tin người dùng vào session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Đăng nhập bằng tài khoản Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// Xử lý callback khi người dùng đã đăng nhập thành công
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Xử lý sau khi người dùng đăng nhập thành công
    res.redirect('/profile');
  }
);

// Đăng xuất
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Trang chủ
app.get('/', (req, res) => {
  res.send('Trang chủ');
});

// Trang thông tin người dùng
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Thông tin người dùng: ' + JSON.stringify(req.user));
  } else {
    res.redirect('/login');
  }
});

// Trang đăng nhập
app.get('/login', (req, res) => {
  res.send('Trang đăng nhập');
});

// Khởi động server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});

