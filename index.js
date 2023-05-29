const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./app/routes/routes');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(morgan('dev'));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.set('layout', 'layouts/users');
app.set('layout', 'layouts/admin');

// app.use();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use(express.json()); 
app.use('/',express.urlencoded({ extended: true }), routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
