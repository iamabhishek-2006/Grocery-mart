import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import withAuth from "../components/withAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const eleName = e.target.name;
    const eleValue = e.target.value;
    setInput({ ...input, [eleName]: eleValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (!data.success) {
        setIsSuccess(false);
        setMessage(data.error || data.message || "Something went wrong");
      }

      if (data.success) {
        setIsSuccess(true);
        setMessage(data.message || "Login Successful!");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <form onSubmit={handleSubmit} className="w-105 p-8 ">
        <div className="text-center mb-8 px-8 ">
          <h2 className="text-3xl font-semibold tracking-wide">Login</h2>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 h-1px bg-gray-400"></div>

            <p className="text-gray-700 font-medium text-sm">
              LOGIN AUTHORIZED ADMIN ONLY
            </p>

            <div className="flex-1 h-1px bg-gray-400"></div>
          </div>
        </div>

        {message && (
          <div
            className={`border text-center py-2 px-4 rounded-md text-sm font-medium mb-2 ${isSuccess ? "bg-green-100 border-green-300 text-green-700" : "bg-red-100 border-red-300 text-red-600"}`}
          >
            {message}
          </div>
        )}

        <div className="flex items-center border rounded-md px-3 py-2 mb-5">
          <Mail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center border rounded-md px-3 py-2 mb-6">
          <Lock className="text-gray-500 mr-2" size={20} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full outline-none"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
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

        <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-1 rounded-md text-lg cursor-pointer font-mono">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
