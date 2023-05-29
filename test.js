const ggDriver = require('./app/models/ggDriver');
const path = require('path');

const driver = new ggDriver();
const imageFilePath = path.join(__dirname, 'image.jpg');
driver.uploadImage(imageFilePath);
// driver.deleteFile('1Y5Tm96--l-0Uflip9if-9j0dGToPN3O5');