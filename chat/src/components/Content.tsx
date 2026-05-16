import React from "react";
import { Avatar, Input } from "antd";
import {
  Phone,
  Video,
  MoreVertical,
  SendHorizonal,
  Smile,
  Paperclip,
  Image,
  Mic,
  Sticker,
} from "lucide-react";

const Content = () => {
  const messages = [
    {
      id: 1,
      sender: "other",
      text: "Hey! How are you doing today?",
      time: "10:20 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "I'm doing great! Working on the new chat UI 🚀",
      time: "10:22 AM",
    },
    {
      id: 3,
      sender: "other",
      text: "Nice! The design already looks clean 🔥",
      time: "10:23 AM",
    },
    {
      id: 4,
      sender: "me",
      text: "Thank you! I'm also adding dark mode support.",
      time: "10:25 AM",
    },
  ];

  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg flex flex-col h-full">
      {/* HEADER */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar size={50} src="https://i.pravatar.cc/150?img=1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              John Doe
            </h2>
            <p className="text-sm text-green-500">Online</p>
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
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-[#fafafa] dark:bg-[#0f0f0f]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl
  ${
    msg.sender === "me"
      ? "bg-orange-500 text-white rounded-br-md"
      : "bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-white rounded-bl-md"
  }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-[11px] block text-right mt-2 opacity-70">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
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
            size="large"
            placeholder="Aa..."
            className="rounded-xl h-[48px] text-black focus:border-black hover:border-black"
          />
          <button>
            <SendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
