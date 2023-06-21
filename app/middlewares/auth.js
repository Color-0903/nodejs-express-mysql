
const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.session.token;
    if(!token) res.redirect("/authen/login");

    const _token = jwt.verify(token, process.env.SECRET_KEY);
    if(_token.role != 1) res.redirect("/authen/login");

    next();
}

module.exports = {
    auth
}