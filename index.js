require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const configSession = require('./app/config/session');
const routes = require('./app/routes/routes');
const session = require("express-session");
const passport = require('passport');
require('./app/config/passport')(passport)

app.use(cors());
app.use(morgan('dev'));
app.use(session(configSession));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.set('layout', 'layouts/users');
app.set('layout', 'layouts/admin');
app.set('layout', 'layouts/free');

// app.use();
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(express.json()); 
app.use('/',express.urlencoded({ extended: true }), routes);


app.use(passport.initialize());
app.use(passport.session());



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
