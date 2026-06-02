import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input,setInput]=useState({
    email:"",
    password:""
  });

  const handleChange=(e)=>{
    const eleName=e.target.name;
    const eleValue=e.target.value
    setInput({...input , [eleName]: eleValue });
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const startTime = Date.now();
    const url=import.meta.env.VITE_SERVER_URL;

    const res = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    });

    const data = await res.json();
    console.log(data);
    const endTime = Date.now();

    const totalTime = endTime - startTime;

    console.log(`API Response Time: ${totalTime} ms`);

    if (data.success) {
      console.log("Login Success");
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
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

        {/* <div className="bg-red-100 border border-red-300 text-red-600 text-center py-3 rounded-md mb-5">  </div> */}

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
            <Eye
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(false)}
              size={20}
            />
          ) : (
            <EyeOff
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
