require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const url = 'http://localhost:'+process.env.PORT+'/auth/google/callback';
module.exports = (passport) => {
  
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: url
  },
  (accessToken, refreshToken, profile, done) => {
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

};
