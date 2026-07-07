import { useEffect, useState } from "react";
import React from "react";
import api from "../api/axios.js";

function Home() {
  const [products, setProduct] = useState([]);
  const [msg, setMsg] = useState("");
  const productLoad = async () => {
    try {
      const response = await api.get("products/all");
      setProduct(response.data.getProduct);
      setMsg(response.data.message);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    productLoad();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-8 ">
      <div className="flex flex-wrap gap-6 justify-start w-full">
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="w-64 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {product.title}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-amber-600 text-xl font-bold">
                    ${product.price}
                  </span>

                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  Stock: {product.stock}
                </p>

                <button className="w-full mt-3 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
