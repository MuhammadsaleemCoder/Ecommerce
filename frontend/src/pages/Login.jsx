import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);

      setMsg(response.data.message);

      navigate("/");
    } catch (error) {
      setMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left */}
        <div className="hidden md:flex flex-col justify-center bg-amber-600 text-white p-12">
          <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>

          <p className="text-lg text-amber-100 leading-8">
            Login to continue shopping your favourite products.
          </p>

          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
            alt="Shopping"
            className="mt-10 h-72 rounded-2xl object-cover"
          />
        </div>

        {/* Right */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Login</h2>

          <p className="text-gray-500 mb-6">Access your account</p>

          {msg && (
            <p className="mb-4 text-center text-red-500 font-semibold">{msg}</p>
          )}

          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-2 text-amber-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
