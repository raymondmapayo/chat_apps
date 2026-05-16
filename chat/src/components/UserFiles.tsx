import React from "react";
import { Avatar } from "antd";
import {
  User,
  Bell,
  Search,
  ChevronRight,
  Settings,
  Shield,
  Folder,
} from "lucide-react";

interface UserFilesProps {
  isOpen: boolean;
}

const UserFiles: React.FC<UserFilesProps> = ({ isOpen }) => {
  return (
    <div
      className={`
        flex flex-col
        bg-white dark:bg-[#141414]
        border border-gray-200 dark:border-gray-800
        rounded-2xl shadow-lg
        h-full
        transition-all duration-300
        overflow-hidden
      ${isOpen ? "w-[30px] lg:w-[250px]" : "w-[250px] lg:w-[300px]"}
      `}
    >
      {/* TOP SECTION */}
      <div className="hidden xl:flex  flex-col items-center text-center gap-3 pt-8 px-5">
        <Avatar size={85} src="https://i.pravatar.cc/150?img=1" />

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          John Doe
        </h2>

        <div className="flex items-center justify-center gap-10 mt-2">
          <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <User size={18} />
            <span className="text-xs mt-1">Profile</span>
          </button>

          <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <Bell size={18} />
            <span className="text-xs mt-1">Mute</span>
          </button>

          <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <Search size={18} />
            <span className="text-xs mt-1">Search</span>
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-800" />

      {/* MENU */}
      <div className="flex flex-col gap-3 px-4 py-5 flex-1 overflow-y-auto">
        <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f1f]">
          <span className="flex items-center gap-2">
            <Settings size={18} />
            Chat Info
          </span>
          <ChevronRight size={18} />
        </button>

        <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f1f]">
          <span className="flex items-center gap-2">
            <User size={18} />
            Customize Chat
          </span>
          <ChevronRight size={18} />
        </button>

        <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f1f]">
          <span className="flex items-center gap-2">
            <Folder size={18} />
            Media & Files
          </span>
          <ChevronRight size={18} />
        </button>

        <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f1f]">
          <span className="flex items-center gap-2">
            <Shield size={18} />
            Privacy & Support
          </span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserFiles;
