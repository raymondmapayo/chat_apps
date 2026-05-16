import React from "react";
import { Moon, Sun } from "lucide-react";
import { Avatar, Badge, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface ChatCardProps {
  isOpen: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({ isOpen }) => {
  const limitMessage = (msg: string, limit: number) => {
    return msg.length > limit ? msg.slice(0, limit) + "....." : msg;
  };
  const chats = [
    {
      id: 1,
      name: "John Doe",
      message: "Hey! How are you?",
      time: "2m",
      unread: 2,
      active: true,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Maria Clara",
      message: "Can we meet tomorrow?",
      time: "10m",
      unread: 0,
      active: false,
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      name: "Alex Smith",
      message: "The files are ready.",
      time: "1h",
      unread: 4,
      active: false,
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 4,
      name: "Team Support",
      message: "Please check the updates safdaf  adsssfdfdfd asffdfdfdsd.",
      time: "3h",
      unread: 1,
      active: true,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
  ];

  return (
    <div
      className={`
        flex flex-col flex-shrink-0
        bg-white dark:bg-[#141414]
        border border-gray-200 dark:border-gray-800
        rounded-2xl shadow-lg
        transition-all duration-300 ease-in-out
        h-full
        w-full
      ${isOpen ? "max-w-[295px] lg:w-[340px]" : "max-w-[295px]lg:w-[340px]"}
      `}
    >
      {/* HEADER */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Chats
        </h1>

        <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1f1f1f] flex items-center justify-center">
          <Moon size={18} className="hidden dark:block" />
          <Sun size={18} className="block dark:hidden" />
        </button>
      </div>

      {/* SEARCH */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Input
          size="large"
          placeholder="Search conversations..."
          prefix={<SearchOutlined />}
          className="rounded-xl"
        />
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="
              flex items-center gap-3 p-3 rounded-xl cursor-pointer
              hover:bg-gray-100 dark:hover:bg-[#1f1f1f]
              transition-all
            "
          >
            <div className="relative">
              <Avatar size={60} src={chat.avatar} />

              {chat.active && (
                <span
                  className="
        absolute -bottom-0.5 right-1
        w-3.5 h-3.5
        bg-green-500
        rounded-full
        border-2 border-white dark:border-[#141414]
        shadow-sm
      "
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className="font-semibold truncate text-gray-800 dark:text-white">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-400 ml-2">{chat.time}</span>
              </div>

              <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden">
                {limitMessage(chat.message, isOpen ? 21 : 33)}
              </p>
            </div>

            {chat.unread > 0 && <Badge count={chat.unread} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
