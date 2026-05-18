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
  MessageCircle,
} from "lucide-react";

import { socket } from "../socket/socket";

const Content = ({ chat }: any) => {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [text, setText] = React.useState("");

  // ✅ GET CURRENT USER FROM SESSION STORAGE
  const currentUser = JSON.parse(sessionStorage.getItem("user") || "null");

  const currentUserId = currentUser?.id;

  // ✅ FETCH MESSAGES + MARK AS READ
  React.useEffect(() => {
    if (!chat) return;

    fetchMessages();

    axios.post("http://localhost:8081/api/chat/read", {
      senderId: chat.id,
      receiverId: currentUserId,
    });
  }, [chat]);

  // ✅ FETCH CHAT MESSAGES
  const fetchMessages = async () => {
    if (!chat) return;

    try {
      const res = await axios.get(
        `http://localhost:8081/api/chat/messages/${currentUserId}/${chat.id}`,
      );

      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ REAL TIME RECEIVE
  React.useEffect(() => {
    socket.on("receive_message", (data: any) => {
      if (!chat) return;

      if (data.sender_id === chat.id || data.receiver_id === chat.id) {
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

    try {
      await axios.post("http://localhost:8081/api/chat/send", {
        senderId: currentUserId,
        receiverId: chat.id,
        message: text,
      });

      // SAME FORMAT AS DATABASE
      const newMessage = {
        sender_id: currentUserId,
        receiver_id: chat.id,
        message: text,
      };

      socket.emit("send_message", newMessage);

      setMessages((prev) => [...prev, newMessage]);

      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg flex flex-col h-full">
      {/* EMPTY STATE */}
      {!chat ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* ICON */}
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center mb-4">
            <MessageCircle size={32} className="text-gray-500" />
          </div>

          {/* TEXT */}
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
            Select a conversation
          </h2>

          <p className="text-sm text-gray-400">to start chatting</p>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                size={50}
                src={
                  chat?.profile_pic
                    ? `http://localhost:8081/uploads/images/${chat.profile_pic}`
                    : "https://i.pravatar.cc/150"
                }
              />

              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {chat?.fullname}
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
          {/* CHAT BODY */}
          <div className="flex-1 overflow-y-auto px-6 py-5 bg-[#fafafa] dark:bg-[#0f0f0f]">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center mb-3">
                  💬
                </div>
                <p className="text-gray-400 text-sm">No messages yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {messages.map((msg, index) => {
                  const isMe = msg.sender_id === currentUserId;

                  return (
                    <div
                      key={index}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div className="relative max-w-[60%]">
                        {/* MESSAGE BUBBLE */}
                        <div
                          className={`
                  px-4 py-2 text-sm shadow-sm
                  ${
                    isMe
                      ? "bg-orange-500 text-white rounded-2xl rounded-br-sm"
                      : "bg-gray-200 dark:bg-[#1f1f1f] text-black dark:text-white rounded-2xl rounded-bl-sm"
                  }
                `}
                        >
                          {msg.message}
                        </div>

                        {/* ARROW */}
                        <div
                          className={`
                  absolute bottom-0 w-3 h-3 rotate-45
                  ${
                    isMe
                      ? "right-[-4px] bg-orange-500"
                      : "left-[-4px] bg-gray-200 dark:bg-[#1f1f1f]"
                  }
                `}
                        />
                      </div>
                    </div>
                  );
                })}
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
        </>
      )}
    </div>
  );
};

export default Content;
