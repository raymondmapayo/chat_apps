import { useState } from "react";
import { Drawer } from "antd";

import Navbar from "../components/Navbar";
import ChatCard from "../components/ChatCard";
import ChatSidebar from "../components/ChatSidebar";
import Content from "../components/Content";
import UserFiles from "../components/UserFiles";

const ClientLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ ADD THIS (SELECTED CHAT STATE)
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const limitName = (name: string, limit: number = 16) => {
    return name.length > limit ? name.slice(0, limit) + "...." : name;
  };
  const currentUser = JSON.parse(sessionStorage.getItem("user") || "null");
  console.log("CURRENT USER:", currentUser);
  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-[#141414] flex flex-col">
      {/* NAVBAR (MOBILE ONLY) */}
      <div className="md:hidden">
        <Navbar setMobileOpen={setMobileOpen} />
      </div>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        width={260}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=3"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {limitName("Raymond Alilonga Mapayo", 16)}
            </p>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#1f1f1f] flex-shrink-0"
          >
            <span className="text-lg text-gray-700 dark:text-white">›</span>
          </button>
        </div>

        <ChatSidebar isOpen={true} setIsOpen={setIsOpen} />
      </Drawer>

      {/* MAIN LAYOUT */}
      <div className="flex gap-3 h-full overflow-hidden md:overflow-visible p-2 sm:p-3">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:flex h-full">
          <ChatSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* CHAT CARD */}
        <div className="hidden lg:flex h-full">
          <ChatCard
            isOpen={isOpen}
            userId={Number(currentUser?.id)}
            onSelectChat={setSelectedChat} // ✅ IMPORTANT FIX
          />
        </div>

        {/* CENTER CONTENT */}
        <div className="flex-1 min-w-0 h-full flex flex-col">
          <Content chat={selectedChat} /> {/* ✅ PASS DATA */}
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden xl:flex h-full">
          <UserFiles isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
