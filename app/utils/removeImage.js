const fs = require('fs');
const path = require('path');

const imagesFolder = 'app/public';

const deleteImages = () => {
  fs.readdir(imagesFolder, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      fs.unlink(path.join(imagesFolder, file), err => {
        if (err) throw err;
        return file;
      });
    });
  });
}

module.exports = deleteImages;
