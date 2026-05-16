const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

exports.register = (req, res) => {
  const { fullname, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json(err);

    UserModel.create(fullname, email, hash, (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User registered successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findByEmail(email, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = data[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", {
        expiresIn: "1d",
      });

      // 🔥 PUT IT HERE (after login success)
      UserModel.setOnlineStatus(user.id, "Online", () => {});

      res.json({
        message: "Login successful",
        token,
        user,
      });
    });
  });
};
exports.getMe = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");

    UserModel.findByEmail(decoded.email, (err, data) => {
      if (err) return res.status(500).json(err);

      const user = data[0];

      // ✅ return only safe fields
      res.json({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        online_status: user.online_status,
      });
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
