import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Avatar, Badge, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { socket } from "../socket/socket";

interface ChatCardProps {
  isOpen: boolean;
  userId: number;
  onSelectChat: (chat: any) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({
  isOpen,
  userId,
  onSelectChat,
}) => {
  const [chats, setChats] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const limitMessage = (msg: string, limit: number) => {
    return msg?.length > limit ? msg.slice(0, limit) + "....." : msg;
  };

  const fetchChats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8081/api/chat/list/${userId}`,
      );

      setChats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userId) {
      console.log("❌ NO USER ID PASSED TO CHAT CARD");
      return;
    }

    console.log("✅ CHAT CARD USER ID:", userId);

    fetchChats();
    socket.emit("join", userId);

    socket.on("refresh_chat_list", fetchChats);
    socket.on("user_status_changed", fetchChats);

    return () => {
      socket.off("refresh_chat_list");
      socket.off("user_status_changed");
    };
  }, [userId]);

  const filteredChats = chats.filter((chat) =>
    chat.fullname?.toLowerCase().includes(search.toLowerCase()),
  );

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
        ${isOpen ? "max-w-[295px] lg:w-[340px]" : "max-w-[295px] lg:w-[340px]"}
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
          placeholder="Search Messenger..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl"
        />
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1f1f1f]"
          >
            {/* AVATAR */}
            <div className="relative">
              <Avatar
                size={60}
                src={
                  chat.profile_pic
                    ? `http://localhost:8081/uploads/images/${chat.profile_pic}`
                    : "https://i.pravatar.cc/150"
                }
              />

              {/* ONLINE STATUS */}
              {chat.online_status === "Online" && (
                <span className="absolute -bottom-0.5 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#141414]" />
              )}
            </div>

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className="font-semibold truncate text-gray-800 dark:text-white">
                  {chat.fullname}
                </h3>

                <span className="text-xs text-gray-400 ml-2">
                  {chat.created_at
                    ? new Date(chat.created_at).toLocaleTimeString()
                    : ""}
                </span>
              </div>

              <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden">
                {chat.last_message
                  ? limitMessage(chat.last_message, isOpen ? 21 : 33)
                  : "No messages yet"}
              </p>
            </div>

            {/* UNREAD */}
            {Number(chat.unread) > 0 && (
              <Badge
                count={chat.unread}
                style={{ backgroundColor: "#ff4d4f" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
