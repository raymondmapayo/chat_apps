const express = require("express");
const router = express.Router();

const {
  getChats,
  getMessages,
  sendMessage,
  markAsRead,
  getUnreadCount,
} = require("../controllers/chat.controller");

router.get("/list/:userId", getChats);
router.get("/messages/:senderId/:receiverId", getMessages);
router.post("/send", sendMessage);
router.post("/read", markAsRead);
router.get("/unread/:userId", getUnreadCount);
module.exports = router;
