import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import SignUp from "./pages/SignUp.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import ListProduct from "./admin/listProduct.jsx";
import ProductId from "./admin/UpdateId.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/product/:id", element: <ProductDetails /> },
  { path: "/signup", element: <SignUp /> },

  { path: "/admin/products/add-product", element: <AddProduct /> },
  { path: "/admin/products/list", element: <ListProduct /> },
  { path: "/admin/products/update/:id", element: <ProductId /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
