import { useEffect, useState } from "react";
import React from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");
  const productLoad = async () => {
    try {
      const response = await api.get(
        `products/all?search=${search}&category=${category}`,
      );
      setProduct(response.data.getProduct);
      setMsg(response.data.message);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    productLoad();
  }, [search, category]);
  return (
    <div className="min-h-screen  p-6">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-6 flex justify-between px-14">
        <div className="w-1/8 ">
          <Link to="/">Dashboard</Link>
        </div>
        <div className="w-1/5  "></div>
        <div className=" w-100 flex gap-8">
          <input
            type="text"
            className="w-150 rounded-2xl outline-amber-500 border border-gray-300 h-8 p-4 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition  text-gray-700 shadow-sm outline-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products...."
          />
          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium">Category:</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-44 px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
            >
              <option value="">All Products</option>
              <option value="mobile">📱 Mobile</option>
              <option value="laptop">💻 Laptop</option>
            </select>
          </div>
        </div>
        <div>Logo</div>
      </nav>

      <div className=" w-full gap-6 flex flex-wrap justify-between p-10 mt-10 ">
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="w-56 bg-white rounded-lg ml-0 shadow-lg hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="p-3 h-12 overflow-hidden">
                <h2 className="text-xl font-bold text-gray-800">
                  {product.title}
                </h2>
              </div>
              <div className="h-6 px-3 overflow-hidden">
                <h2>{product.description}</h2>
              </div>
              <div className="flex justify-around items-center mb-4">
                <span className="text-amber-600 text-xl font-bold">
                  ₹{product.price}
                </span>
                <Link
                  to={`/product/details/${product._id}`}
                  className="p-3 mt-3 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
