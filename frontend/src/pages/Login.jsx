import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios.js";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const response = await api.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      setMsg(response.data.message);
      navigate("/signup");
    } catch (error) {
      setMsg(error.response.data.message);
      console.log(response.data);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center bg-amber-600 text-white p-12">
          <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>

          <p className="text-amber-100 text-lg leading-8">
            Login to continue shopping your favorite products with exclusive
            deals and fast delivery.
          </p>

          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
            alt="ecommerce"
            className="mt-10 rounded-2xl object-cover h-72"
          />
        </div>

        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Login</h2>
            {msg && <h4>{msg}</h4>}
            <p className="text-gray-500 mt-2">Access your ecommerce account</p>
          </div>

          <form className="space-y-5" onSubmit={submitForm}>
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-600"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-600"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="text-amber-700 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500">
            Don’t have an account?
            <span className="text-amber-700 font-semibold cursor-pointer ml-1 hover:underline">
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
