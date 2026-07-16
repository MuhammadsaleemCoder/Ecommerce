import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      loadCart();
    }
  }, [userId]);

  // Increase Quantity
  const increaseQty = async (productId, quantity) => {
    try {
      await api.post("/cart/update", {
        userId,
        productId,
        quantity: quantity + 1,
      });

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  // Decrease Quantity
  const decreaseQty = async (productId, quantity) => {
    try {
      if (quantity === 1) {
        removeItem(productId);
        return;
      }

      await api.post("/cart/update", {
        userId,
        productId,
        quantity: quantity - 1,
      });

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Item
  const removeItem = async (productId) => {
    try {
      await api.post("/cart/remove", {
        userId,
        productId,
      });

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  if (!cart) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-gray-600">Your Cart is Empty</h1>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-5">
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between items-center border rounded-xl p-5 shadow-md"
          >
            {/* Product */}
            <div className="flex items-center gap-5">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-xl font-bold">{item.product.title}</h2>

                <p className="text-gray-500 mt-2">{item.product.category}</p>

                <p className="text-amber-600 font-bold mt-2">
                  ${item.product.price}
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => decreaseQty(item.product._id, item.quantity)}
                className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl"
              >
                -
              </button>

              <span className="text-xl font-semibold w-8 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(item.product._id, item.quantity)}
                className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white text-xl"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.product._id)}
              className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-3xl font-bold">Total: ${total.toFixed(2)}</h2>

        <Link
          to="/checkout"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
