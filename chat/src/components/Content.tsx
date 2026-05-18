import React from "react";
import axios from "axios";
import { Avatar, Input } from "antd";
import {
  Phone,
  Video,
  MoreVertical,
  SendHorizonal,
  Paperclip,
  Image,
  Mic,
  Sticker,
} from "lucide-react";

import { socket } from "../socket/socket";

const Content = ({ chat }: any) => {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [text, setText] = React.useState("");

  // ✅ FETCH MESSAGES + MARK AS READ
  React.useEffect(() => {
    if (!chat) return;

    fetchMessages();

    const senderId = localStorage.getItem("user_id");

    axios.post("http://localhost:8081/api/chat/read", {
      senderId: chat.id,
      receiverId: senderId,
    });
  }, [chat]);

  const fetchMessages = async () => {
    const senderId = localStorage.getItem("user_id");

    const res = await axios.get(
      `http://localhost:8081/api/chat/messages/${senderId}/${chat.id}`,
    );

    setMessages(res.data);
  };

  // ✅ REAL-TIME RECEIVE MESSAGE
  React.useEffect(() => {
    socket.on("receive_message", (data: any) => {
      if (!chat) return;

      if (data.senderId === chat.id || data.receiverId === chat.id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [chat]);

  // ✅ SEND MESSAGE
  const sendMessage = async () => {
    if (!text.trim()) return;

    const senderId = localStorage.getItem("user_id");

    await axios.post("http://localhost:8081/api/chat/send", {
      senderId,
      receiverId: chat.id,
      message: text,
    });

    socket.emit("send_message", {
      senderId,
      receiverId: chat.id,
      message: text,
    });

    setMessages((prev) => [
      ...prev,
      {
        sender_id: Number(senderId),
        receiver_id: chat.id,
        message: text,
      },
    ]);

    setText("");
  };

  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg flex flex-col h-full">
      {/* HEADER */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar size={50} src={chat?.avatar} />

          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {chat?.fullname || "Select a chat"}
            </h2>

            <p className="text-sm text-green-500">
              {Number(chat?.online_status) === 1 ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center">
            <Phone size={18} />
          </button>

          <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center">
            <Video size={18} />
          </button>

          <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-6 py-5 bg-[#fafafa] dark:bg-[#0f0f0f]">
        {!chat ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400 text-sm">
              Select a conversation to start chatting
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center mt-10">
                No messages yet
              </p>
            ) : (
              messages.map((msg, index) => {
                const isMe =
                  msg.sender_id === Number(localStorage.getItem("user_id"));

                return (
                  <div
                    key={index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[60%] text-sm ${
                        isMe
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 dark:bg-[#1f1f1f] text-black dark:text-white"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center">
            <Mic />
          </button>

          <button className="w-11 h-11 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center">
            <Image />
          </button>

          <button className="w-11 h-11 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center">
            <Sticker />
          </button>

          <button className="w-11 h-11 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center">
            <Paperclip />
          </button>

          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={sendMessage}
            size="large"
            placeholder="Aa..."
            className="rounded-xl h-[48px]"
          />

          <button onClick={sendMessage}>
            <SendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
