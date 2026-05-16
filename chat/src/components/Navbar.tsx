import React from "react";
import { Menu } from "lucide-react";

interface NavbarProps {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setMobileOpen }) => {
  return (
    <div className="w-full h-14 px-4 flex items-center justify-between bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-gray-800">
      {/* MENU BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f1f] transition"
      >
        <Menu size={20} className="text-gray-700 dark:text-white" />
      </button>

      {/* TITLE */}
      <h1 className="text-base font-semibold text-gray-800 dark:text-white">
        Chat App
      </h1>

      <div className="w-10 h-10" />
    </div>
  );
};

export default Navbar;
