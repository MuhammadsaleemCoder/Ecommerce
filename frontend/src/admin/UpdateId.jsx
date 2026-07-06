import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductId() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [msg, setMsg] = useState("");

  const loadSingleProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      console.log(res.data.getProductId);
      setForm(res.data.getProductId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadSingleProduct();
  }, []);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await api.put(`/products/update/${id}`, form);
      setMsg(res.data.getProductId);
      navigate("/admin/products/list");
    } catch (error) {
      setMsg(error.response?.data?.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-1/2 ">
        <h1 className="text-center mb-3 text-3xl font-bold ">
          Add New Product
        </h1>
        <div>{msg && <h1>{msg}</h1>}</div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Product Title"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Product Description
            </label>

            <input
              type="text"
              value={form.description}
              onChange={handleChange}
              name="description"
              placeholder="Enter Product Description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              price
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              stock
            </label>

            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Enter Stock"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              category
            </label>

            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Enter Category"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Product Image
            </label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Enter Product Image"
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
      </div>
    </div>
  );
}
