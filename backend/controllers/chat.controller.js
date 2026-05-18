const { ChatModel } = require("../models/chat.model");

// CHAT LIST
exports.getChats = (req, res) => {
  ChatModel.getChatList(req.params.userId, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// GET MESSAGES
exports.getMessages = (req, res) => {
  const { senderId, receiverId } = req.params;

  ChatModel.getMessages(senderId, receiverId, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// SEND MESSAGE
exports.sendMessage = (req, res) => {
  const { senderId, receiverId, message } = req.body;

  ChatModel.sendMessage(senderId, receiverId, message, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "sent",
      id: result.insertId,
    });
  });
};

// MARK AS READ
exports.markAsRead = (req, res) => {
  const { senderId, receiverId } = req.body;

  ChatModel.markAsRead(senderId, receiverId, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "read updated" });
  });
};

// ✅ FIXED: OUTSIDE markAsRead
exports.getUnreadCount = (req, res) => {
  ChatModel.getUnreadCount(req.params.userId, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};
