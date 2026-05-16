const { db } = require("../config/db");

exports.UserModel = {
  create: (fullname, email, password, cb) => {
    const sql =
      "INSERT INTO users (fullname, email, password, online_status) VALUES (?, ?, ?, 'Offline')";

    db.query(sql, [fullname, email, password], cb);
  },
  // 🔥 ADD THIS (IMPORTANT)
  setOnlineStatus: (id, status, cb) => {
    const sql = "UPDATE users SET online_status = ? WHERE id = ?";
    db.query(sql, [status, id], cb);
  },

  findByEmail: (email, cb) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], cb);
  },
};
