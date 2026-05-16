import React from "react";
import Login from "./Login";
import RegisterCard from "./Register";

const RegisterLayouts = () => {
  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-[100%] bg-[#1F262A]">
        <Login />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <RegisterCard />
      </div>
    </div>
  );
};

export default RegisterLayouts;
