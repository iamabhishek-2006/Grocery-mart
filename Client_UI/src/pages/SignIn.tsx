import React, { useState } from "react";

function SignIn() {
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
    acceptTerms: false,
  });
  console.log(loginInputs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setLoginInputs({
      ...loginInputs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginInputs.acceptTerms) {
      alert("please accepts and terms & conditions to continue");
      return;
    }
    
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginInputs),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "something went wrong");
        return;
      }
      if (data.success) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login Account
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginInputs.email}
              onChange={handleChange}
              placeholder="your@gmail"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginInputs.password}
              onChange={handleChange}
              placeholder="Create strong password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              name="acceptTerms"
              checked={loginInputs.acceptTerms}
              className="h-4 w-4 text-green-600"
              onChange={handleChange}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms & Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          don't have an account?
          <a
            href="/signUp"
            className="text-green-600 font-semibold hover:underline"
          >
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
