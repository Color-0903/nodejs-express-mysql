const multer = require('multer');

// Định nghĩa nơi lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/product');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Khởi tạo Multer và cấu hình lưu trữ
const upload = multer({ storage: storage });

module.exports = upload;
