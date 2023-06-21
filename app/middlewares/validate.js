const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function validatePhoneNumber(req, res, next) {
  const phoneNumber = req.body.phone;

  try {
    const number = phoneUtil.parse(phoneNumber, 'VN');
    const isValid = phoneUtil.isValidNumber(number);

    if (!isValid) {
        res.render("status/error", { layout: "layouts/users", notification: { messenger: 'Số điện thoại không hợp lệ!', type: 'warning'} });
    }

    next();
  } catch (err) {
    return res.status(400).json({ error: 'Lỗi xử lý số điện thoại.' });
  }
}

module.exports = {
    validatePhoneNumber,
}