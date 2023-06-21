const jwt = require('jsonwebtoken');

function _token(req, res, redirect = true){
    const token = req.session.token;
    const result =  (token) ? jwt.verify(token, process.env.SECRET_KEY) : null;
    if(!result && redirect) res.redirect("/authen/login");

    return {
        name: result ? result.name : null, 
        role: result ? result.role : null,
        fullName: result ? result.fullName : null,
        phone: result ? result.phone : null,
        address: result ? result.address : null
    }
}

function _destroyToken( req, res ){
    delete req.session.token;
}
module.exports = {
    _token,
    _destroyToken
}