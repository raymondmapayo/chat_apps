import React from "react";
import LoginCard from "./loginCard";
import Login from "./Login";

const LoginLayouts = () => {
  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-[100%] bg-[#1F262A]">
        <Login />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginLayouts;
