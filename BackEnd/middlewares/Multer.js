const multer = require("multer");
const path = require("path");

const uploadMultiple = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images", 2);

const uploadSingle = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: async function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images", 1);

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|webp|jfif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = { uploadMultiple, uploadSingle };
