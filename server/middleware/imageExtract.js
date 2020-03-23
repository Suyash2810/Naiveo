const multer = require('multer');
const moment = require('moment');

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        let error = new Error('MIMETYPE is not valid.');
        let isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            error = null;
        }

        callback(error, './server/public/src/images');
    },
    filename: (request, file, callback) => {

        let name = file.originalname.split('.').join('_') + "_" + Date.now() + "." + MIME_TYPE[file.mimetype];

        callback(null, name);
    }
});

module.exports = multer({
    storage: storage
}).single('image');