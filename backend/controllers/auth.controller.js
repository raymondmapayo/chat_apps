const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

// REGISTER
exports.register = (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const profile_pic = req.file ? req.file.filename : null;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json(err);

      UserModel.create(fullname, email, hash, profile_pic, (err) => {
        if (err) {
          console.log("DB ERROR:", err);
          return res.status(500).json(err);
        }

        res.json({
          message: "User registered successfully",
          profile_pic,
        });
      });
    });
  } catch (error) {
    console.log("REGISTER CRASH:", error);
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN (FIXED)
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  UserModel.findByEmail(email, (err, data) => {
    if (err) return res.status(500).json(err);

    // ✅ FIX: prevent crash
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = data[0];

    // ✅ FIX: prevent bcrypt crash
    if (!user.password) {
      return res.status(500).json({ message: "Password missing in DB" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json(err);

      if (!result) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", {
        expiresIn: "1d",
      });

      // online status
      UserModel.setOnlineStatus(user.id, 1, () => {});

      return res.json({
        message: "Login successful",
        token,
        user,
      });
    });
  });
};

// GET ME
exports.getMe = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");

    UserModel.findByEmail(decoded.email, (err, data) => {
      if (err) return res.status(500).json(err);

      if (!data || data.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = data[0];

      return res.json({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        online_status: user.online_status,
        profile_pic: user.profile_pic, // ✅ ADD THIS
      });
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  UserModel.setOnlineStatus(id, 0, (err) => {
    if (err) return res.status(500).json(err);

    return res.json({ message: "Logged out successfully" });
  });
};
