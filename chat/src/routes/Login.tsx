import { Check } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-full bg-[#1F262A] relative flex items-start justify-start p-10 pl-48">
        {/* CONTENT */}
        <div className="max-w-md text-white z-10">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight whitespace-nowrap text-center">
            Connect. Collaborate. Complete.
          </h1>
          <p className="mt-5 ml-36 text-gray-300 text-base leading-relaxed">
            <span className="whitespace-nowrap">
              Stay synced, share ideas, and build products faster.
            </span>
          </p>
          {/* DEVICE MOCKUP */}
          <div className="mt-20 relative flex justify-start items-end -translate-x-40">
            {/* LAPTOP (MAIN) */}
            <img
              src="lap.png"
              alt="laptop"
              className="w-[950px] lg:w-[950px] object-contain rounded-xl shadow-2xl"
            />

            {/* IPHONE (BOTTOM RIGHT / SLIGHTLY DOWN) */}
            <img
              src="ip.png"
              alt="iphone"
              className="w-[100px] object-contain absolute bottom-[-20px] right-[-45px] shadow-xl"
            />
          </div>
          {/* RIGHT SIDE CHECK LIST */}

          {/* RIGHT SIDE CHECK LIST (DETACHED FROM H1) */}
          <div className="absolute top-1/2 right-5 -translate-y-1/2 text-white max-w-md space-y-3">
            <div className="flex items-center gap-2">
              <Check className="text-green-400 w-5 h-5" />
              <span>Real-Time Messaging</span>
            </div>

            <div className="flex items-center gap-2">
              <Check className="text-green-400 w-5 h-5" />
              <span>Integrated File Sharing</span>
            </div>

            <div className="flex items-center gap-2">
              <Check className="text-green-400 w-5 h-5" />
              <span>Project & Event Sync</span>
            </div>

            <p className="text-sm opacity-80 leading-relaxed">
              Real-Time Messaging, Integrated File Sharing, Project & Event
              Sync, End-to-End Encryption, Multi-Device Support, Fast
              Performance Optimization, Dark Mode Friendly UI, Custom
              Notifications System, Cloud-Based Data Storage, and Seamless Team
              Collaboration.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="mt-28 w-[950px] flex gap-6  -translate-x-40">
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex-1">
              <h3 className="font-semibold text-lg">Real-time Messaging</h3>
              <p className="text-sm text-gray-300 mt-1">
                Chat instantly with smooth modern UI interactions.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex-1">
              <h3 className="font-semibold text-lg">Secure Platform</h3>
              <p className="text-sm text-gray-300 mt-1">
                Your messages and account stay protected and private.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex-1">
              <h3 className="font-semibold text-lg">Integrated File Sharing</h3>
              <p className="text-sm text-gray-300 mt-1">
                Share files instantly with seamless synchronization across
                devices.
              </p>
            </div>
          </div>
        </div>

        {/* DECORATION */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-72 h-72 bg-white/5 rounded-full -top-16 -left-16" />
          <div className="absolute w-96 h-96 bg-white/5 rounded-full bottom-[-120px] right-[-120px]" />
        </div>
      </div>
    </div>
  );
};

export default Login;
