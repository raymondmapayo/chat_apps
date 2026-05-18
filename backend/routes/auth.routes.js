const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// ✅ NEW: fetch logged-in user
router.get("/me", getMe);
router.post("/logout", logout);
module.exports = router;
