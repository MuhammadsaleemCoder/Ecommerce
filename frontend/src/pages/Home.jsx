import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");

  const productLoad = async () => {
    try {
      const res = await api.get(
        `/products/all?search=${search}&category=${category}`,
      );

      setProducts(res.data.getProduct);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    productLoad();
  }, [search, category]);

  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      const res = await api.post("/cart/add", {
        userId,
        productId,
      });

      const total = res.data.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-wrap justify-between gap-6 mt-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-56 bg-white rounded-lg shadow-lg hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />

            <div className="p-3">
              <h2 className="text-xl font-bold">{product.title}</h2>

              <p className="text-sm text-gray-600 h-10 overflow-hidden">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xl font-bold text-amber-600">
                  ₹{product.price}
                </span>
              </div>

              <Link
                to={`/product/details/${product._id}`}
                className="block text-center mt-3 bg-gray-700 text-white py-2 rounded-lg"
              >
                View Details
              </Link>

              <button
                onClick={() => addToCart(product._id)}
                className="w-full mt-2 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
