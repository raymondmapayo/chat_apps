const { db } = require("../config/db");

exports.ChatModel = {
  // SEND MESSAGE
  sendMessage: (senderId, receiverId, message, cb) => {
    const sql = `
      INSERT INTO messages 
      (sender_id, receiver_id, message, is_read, created_at)
      VALUES (?, ?, ?, 0, NOW())
    `;

    db.query(sql, [senderId, receiverId, message], cb);
  },

  // CHAT LIST (FIXED VERSION)
  getChatList: (userId, cb) => {
    const sql = `
    SELECT 
      id,
      fullname,
      online_status
    FROM users
    WHERE id != ?
    ORDER BY fullname ASC
  `;

    db.query(sql, [userId], cb);
  },
  // GET MESSAGES
  getMessages: (senderId, receiverId, cb) => {
    const sql = `
      SELECT * FROM messages
      WHERE (sender_id = ? AND receiver_id = ?)
         OR (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
    `;

    db.query(sql, [senderId, receiverId, receiverId, senderId], cb);
  },

  // MARK AS READ
  markAsRead: (senderId, receiverId, cb) => {
    const sql = `
    UPDATE messages 
    SET is_read = 1
    WHERE sender_id = ? AND receiver_id = ?
  `;

    db.query(sql, [senderId, receiverId], cb);
  },

  getUnreadCount: (userId, cb) => {
    const sql = `
    SELECT sender_id, COUNT(*) as unread
    FROM messages
    WHERE receiver_id = ? AND is_read = 0
    GROUP BY sender_id
  `;

    db.query(sql, [userId], cb);
  },
};
