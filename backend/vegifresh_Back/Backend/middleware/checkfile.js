const multer = require("multer");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}


const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error("invalid mime type")
    if (isValid) {
      error = null
    }
    cb(error, "../Backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split('').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + Date.now() + '.' + ext)
  }
})

module.exports=multer({ storage: Storage }).single("image")
