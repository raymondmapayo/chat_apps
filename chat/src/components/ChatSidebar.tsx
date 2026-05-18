import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  Store,
  Inbox,
  Archive,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import axios from "axios";
import { socket } from "../socket/socket";

interface ChatSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, setIsOpen }) => {
  const menu = [
    { id: 1, name: "Chats", icon: <MessageCircle size={25} /> },
    { id: 2, name: "Marketplace", icon: <Store size={25} /> },
    { id: 3, name: "Requests", icon: <Inbox size={25} /> },
    { id: 4, name: "Archive", icon: <Archive size={25} /> },
  ];

  const image = {
    image: "https://i.pravatar.cc/150?img=3",
  };

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // ✅ FIXED

    if (!token) return;

    axios
      .get("http://localhost:8081/api/auth/me", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUser(res.data);

        // ✅ SAVE USER FOR WHOLE APP
        sessionStorage.setItem("user", JSON.stringify(res.data));

        // ✅ SOCKET JOIN
        socket.emit("join", res.data.id);
        socket.emit("login", res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });

    // ✅ REALTIME STATUS UPDATE
    const handleStatus = (data: any) => {
      setUser((prev: any) => ({
        ...prev,
        online_status: data.online_status,
      }));
    };

    socket.on("user_status_changed", handleStatus);

    return () => {
      socket.off("user_status_changed", handleStatus); // ✅ FIXED CLEANUP
    };
  }, []);

  const handleLogout = async () => {
    try {
      const userId = user?.id;

      await axios.post("http://localhost:8081/api/auth/logout", {
        id: userId,
      });

      socket.emit("logout", userId);

      // ✅ FIXED STORAGE CLEAR
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`
        h-full
        dark:bg-[#141414]
        flex flex-col
        transition-all duration-300
        rounded-2xl
        ${isOpen ? "w-[200px] sm:w-[220px]" : "w-[60px] sm:w-[70px]"}
      `}
    >
      {/* MENU */}
      <div className="flex-1 flex flex-col gap-2 p-2">
        {menu.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1f1f1f] transition"
          >
            <div className="text-gray-700 dark:text-white">{item.icon}</div>

            {isOpen && (
              <span className="text-gray-700 dark:text-white font-medium text-sm sm:text-base">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div
        className={`
          p-3 border-t border-gray-200 dark:border-gray-800
          flex items-center gap-3
          transition-all duration-300
          ${isOpen ? "justify-between" : "flex-col justify-center"}
        `}
      >
        {/* USER */}
        <div className={`flex items-center gap-3 ${isOpen ? "" : "flex-col"}`}>
          <img
            src={image.image}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />

          {isOpen && (
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                {user?.fullname}
              </h4>
              <p className="text-xs text-green-500">{user?.online_status}</p>
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="text-xs text-red-500 hover:text-red-600 mt-2"
        >
          Logout
        </button>

        {/* TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-9 h-9 flex items-center justify-center rounded-lg
            hover:bg-gray-100 dark:hover:bg-[#1f1f1f] transition
            ${isOpen ? "ml-auto" : "mt-2"}
          `}
        >
          {isOpen ? <PanelLeftClose size={22} /> : <PanelLeftOpen size={22} />}
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
