const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/auth.controller");

const upload = require("../middleware/upload");

const router = express.Router();

// 🔥 ADD MULTER HERE
router.post("/register", upload.single("profile_pic"), register);

router.post("/login", login);
router.get("/me", getMe);
router.post("/logout", logout);

module.exports = router;
