import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
import Home from "./Home.jsx";

function SingleProduct() {
  let { id } = useParams();
  const [products, setProducts] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });
  const [msg, setMsg] = useState("");
  const loadId = async () => {
    try {
      const res = await api.get(`/products/details/${id}`);
      console.log(id);
      setProducts(res.data.singleId);
    } catch (error) {
      setMsg("Server error");
    }
  };
  useEffect(() => {
    loadId();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg flex gap-10 p-8">
        {/* Left Side */}
        <div className="w-1/2">
          <img
            src={products.image}
            alt={products.title}
            className="w-full h-[550px] object-cover rounded-xl"
          />
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {products.title}
            </h1>

            <div className="flex items-center gap-10 mt-6">
              <h2 className="text-3xl font-bold text-amber-600">
                ₹{products.price}
              </h2>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                Stock: {products.stock}
              </span>
              <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
                Stock: {products.category}
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-3">Description</h3>

              <p className="text-gray-600 leading-8">{products.description}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex gap-10">
            <div className="w-1/6       rounded">
              <img
                src={products.image}
                alt=""
                className="w-full h-18 object-cover"
              />
            </div>
            <div className="w-1/6   rounded">
              <img
                src={products.image}
                alt=""
                className="w-full h-18 object-cover"
              />
            </div>
            <div className="w-1/6   rounded">
              <img
                src={products.image}
                alt=""
                className="w-full h-18 object-cover"
              />
            </div>
          </div>
          <div>
            <span className="text-amber-600 text-2xl">size:</span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="bg-gray-600 px-3 rounded text-white py-1">
              S
            </button>
            <button className="bg-gray-600 px-3 rounded text-white py-1 ml-6    ">
              M
            </button>
            <button className="bg-gray-600 px-3 rounded text-white py-1 ml-6">
              L
            </button>
            <button className="bg-gray-600 px-3 rounded text-white py-1 ml-6">
              XL
            </button>
          </div>
          <div className="flex gap-4">
            <button className="w-1/2 h-12 bg-gray-800 text-white rounded-lg hover:bg-black">
              Add to Cart
            </button>

            <button className="w-1/2 h-12 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg flex gap-10 p-8 mt-8">
        <Home />
      </div>
    </div>
  );
}

export default SingleProduct;
