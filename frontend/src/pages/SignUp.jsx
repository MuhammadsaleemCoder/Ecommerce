import React, { useState } from "react";
import api from "../api/axios.js";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", formData);
      setMsg(response.data.message);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-amber-600 text-white p-12">
          <h1 className="text-5xl font-bold mb-6">Shop Smarter</h1>

          <p className="text-lg leading-8 text-amber-100">
            Create your account and discover the latest fashion, electronics,
            and lifestyle products with amazing deals.
          </p>

          <img
            src="https://images.unsplash.com/photo-1521334884684-d80222895322"
            alt="shopping"
            className="mt-10 rounded-2xl object-cover h-72"
          />
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Create Account</h2>

            <p className="text-gray-500 mt-2">
              Join our ecommerce platform today
            </p>
            {msg && <p>{msg}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500">
            Already have an account?
            <span className="text-amber-700 font-semibold cursor-pointer ml-1 hover:underline">
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
