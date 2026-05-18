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
      u.id,
      u.fullname,
      u.online_status,
      u.profile_pic,

      -- LAST MESSAGE
      (
        SELECT m.message
        FROM messages m
        WHERE (m.sender_id = u.id AND m.receiver_id = ?)
           OR (m.sender_id = ? AND m.receiver_id = u.id)
        ORDER BY m.created_at DESC
        LIMIT 1
      ) AS last_message,

      -- UNREAD COUNT
      (
        SELECT COUNT(*)
        FROM messages m2
        WHERE m2.sender_id = u.id
          AND m2.receiver_id = ?
          AND m2.is_read = 0
      ) AS unread

    FROM users u
    WHERE u.id != ?
    ORDER BY u.fullname ASC
  `;

    db.query(sql, [userId, userId, userId, userId], cb);
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
