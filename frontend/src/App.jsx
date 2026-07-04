import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/product/:id", element: <ProductDetails /> },
  { path: "/signup", element: <SignUp /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
