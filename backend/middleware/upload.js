const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ absolute path (prevents ENOENT forever)
const uploadPath = path.join(__dirname, "../uploads/images");

// ✅ auto-create folder if missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // ✅ SAFE PATH
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
