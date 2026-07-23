import React from 'react'

 function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <form className="space-y-2">
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@gmail"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create strong password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-green-600"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms & Conditions
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>
       
        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <a
            href="/signIn"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup