import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./MainLayouts/MainLayout";

import LoginLayouts from "./routes/LoginLayouts";
import RegisterLayouts from "./routes/RegisterLayouts";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<LoginLayouts />} />
        {/* REGISTER */}
        <Route path="/register" element={<RegisterLayouts />} />

        {/* MAIN LAYOUT */}
        <Route path="/chat" element={<MainLayout />}>
          <Route index element={<div />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="w-full h-screen flex items-center justify-center text-2xl font-bold">
              404 Not Found
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
