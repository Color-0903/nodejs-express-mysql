const User = require("../services/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { _token, _destroyToken } = require('../utils/token');
const { v4: uuidv4 } = require("uuid");

// google 
async function google(req, res){
  const { id, displayName } = req.user;
  const pass = uuidv4();
  console.log("id: " + id);
  if(!id) res.redirect('/authen/login');

  const [user, created] = await User.findOrCreate({
    where: { NAME: id },
    defaults: { NAME: id, PASSWORD: pass, ROLE: 0, FULLNAME: displayName, PHONE: null, ADDRESS: null }
  });

  const token = jwt.sign({
    name: user.NAME,
    password: user.PASSWORD,
    role: 0,
    fullName: user.FULLNAME,
  }, process.env.SECRET_KEY);

  console.log("token moi tao: " + token);
  req.session.token = token;

  return {
    user, 
    created,
    token
  }
}

// register
async function register(req, res) {
  const { name, password, passConfirm } = req.body || req.params;

  if(password !== passConfirm) res.render("authen/register", 
  { layout: "layouts/free", notification: { messenger: 'Mật khẩu nhập lại không giống!', type: 'warning'} });

  if (!name || !password) return res.status(400).json({
    error: 1,
    msg: 'Not enough data inputs!'
  })
  const passHash = bcrypt.hashSync(password, 10);
  
  const [user, created] = await User.findOrCreate({
    where: { NAME: name },
    defaults: { NAME: name, PASSWORD: passHash, ROLE: 0, FULLNAME: null, PHONE: null, ADDRESS: null }
  });

  if(!created) res.render("authen/register", { layout: "layouts/free", notification: { messenger: 'Tên tài khoản đã được sử dụng!', type: 'warning'} });

  const token = jwt.sign({
    name,
    passHash,
    role: 0
  }, process.env.SECRET_KEY);

  req.session.token = token;

  return {
    user, 
    created,
    token
  }

}

//login
async function login(req, res) {
  const { name, password } = req.body || req.params;
  if(!name || !password) return res.status(400).json({
    error: 1,
    msg: 'Not enough data inputs!'
  });

  const user = await User.findOne( { where: { NAME: name } } );

  if(!user) res.render("authen/login", { layout: "layouts/free", notification: { messenger: 'Tài khoản không tồn tại!', type: 'warning'} });
  
  const isSamePassword = bcrypt.compareSync(password, user.PASSWORD);
  if(!isSamePassword) res.render("authen/login", { layout: "layouts/free", notification: { messenger: 'Mật khẩu không chính xác!', type: 'warning'} });

  const token = jwt.sign({
    name,
    password: user.PASSWORD,
    role: user.ROLE,
    fullName: user.FULLNAME,
    phone: user.PHONE,
    address: user.ADDRESS,
  }, process.env.SECRET_KEY);

  req.session.token = token;
  return {
    user,
    token,
  }
}

// profile
async function dashboard(req, res){
  const token = _token(req, res);
  return token;
}

// update user
async function update(req, res){
  const { fullName, phone, address } = req.body || req.params;

  const user = _token(req,res);
  const updateRecord = User.update({ 
    FULLNAME: fullName ? fullName : user.fullName,
    PHONE: phone ? phone : user.phone,
    ADDRESS: address ? address : user.address
   }, {where: { NAME: user.name }});

   const _token = jwt.sign({
    name: user.name,
    password: user.password,
    role: user.ROLE,
    fullName: fullName ? fullName : user.fullName,
    phone: phone ? phone : user.phone,
    address: address ? address : user.address,
  }, process.env.SECRET_KEY);

  req.session.token = _token;

   return updateRecord;
}

//louout
function logout(req, res){
  const token = _token(req, res);
  if(token) _destroyToken(req, res);
}
module.exports = {
  google,
  register,
  login,
  dashboard,
  update,
  logout
};
