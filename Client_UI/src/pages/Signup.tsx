import React, { useState } from 'react'

 function Signup() {
  const [formInput,setFormInput]=useState({
    name:"",
    email:"",
    password:"",
    acceptTerms:false
  });

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormInput({...formInput,[e.target.name]:e.target.value});
  }

  const submitHandler=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    if(!formInput.acceptTerms){
      alert("please accepts and terms & conditions to continue");
      return;
    }
    try {
      const url=import.meta.env.VITE_SERVER_URL;
      const res=await fetch(`${url}/auth/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify(formInput)
    });
    const data=await res.json();
    if(!data.success){
      alert(data.error || "something went wrong");
      return;
    }

    if(data.success){
      window.location.href="/"
    }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <form onSubmit={submitHandler} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formInput.email}
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
              value={formInput.password}
              onChange={handleChange}
              required
              placeholder="Create strong password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              checked={formInput.acceptTerms}
              onChange={(e)=>setFormInput({...formInput,acceptTerms:e.target.checked})}
              className="h-4 w-4 text-green-600"
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