import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!userId) {
          setCartCount(0);
          return;
        }

        const res = await api.get(`/cart/${userId}`);

        const total = res.data.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );

        setCartCount(total);
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow bg-white">
      <Link to="/" className="text-2xl font-bold">
        Store
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative text-2xl">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {!userId ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
