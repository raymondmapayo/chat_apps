const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const { ChatModel } = require("./models/chat.model");

dotenv.config();

const app = express();
const server = http.createServer(app);
const onlineUsers = new Map();
// SOCKET.IO
const io = new socketIo.Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.userId = userId;
    onlineUsers.set(userId, socket.id);

    io.emit("user_status_changed", {
      userId,
      online_status: "Online",
    });
  });

  // ✅ SEND MESSAGE TO SPECIFIC USER
  socket.on("send_message", ({ senderId, receiverId, message }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", {
        senderId,
        receiverId,
        message,
        created_at: new Date(),
        is_read: 0,
      });
    }

    // also refresh chat list (for unread badge)
    io.emit("refresh_chat_list");
  });

  socket.on("disconnect", () => {
    const userId = socket.userId;

    if (userId) {
      onlineUsers.delete(userId);

      io.emit("user_status_changed", {
        userId,
        online_status: "Offline",
      });
    }

    console.log("User disconnected:", socket.id);
  });
});
// START SERVER
server.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});
