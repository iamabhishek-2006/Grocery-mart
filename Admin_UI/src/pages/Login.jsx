import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  

  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="w-[420px] p-8 ">
        <div className="text-center mb-8 px-8 ">
          <h2 className="text-3xl font-semibold tracking-wide">Login</h2>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 h-[1px] bg-gray-400"></div>

            <p className="text-gray-700 font-medium text-sm">
              LOGIN AUTHORIZED ADMIN ONLY
            </p>

            <div className="flex-1 h-[1px] bg-gray-400"></div>
          </div>
        </div>

        {/* <div className="bg-red-100 border border-red-300 text-red-600 text-center py-3 rounded-md mb-5">  </div> */}

        <div className="flex items-center border rounded-md px-3 py-2 mb-5">
          <Mail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border rounded-md px-3 py-2 mb-6">
          <Lock className="text-gray-500 mr-2" size={20} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full outline-none"
          />

          {showPassword ? (
            <EyeOff
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(false)}
              size={20}
            />
          ) : (
            <Eye
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(true)}
              size={20}
            />
          )}
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-md text-lg cursor-pointer font-mono">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
