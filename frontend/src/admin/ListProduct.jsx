import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function ListProduct() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const loadProducts = async () => {
    try {
      const response = await api.get("/products/all");

      setProducts(response.data.getProduct);
    } catch (error) {
      setMsg(error.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>

          <Link
            to="/admin/products/add-product"
            className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            Add New Product
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="w-full">
              <tr className="bg-amber-600 rounded-lg text-white w-full flex-1">
                <th className="p-3 text-left">Title</th>

                <th className="p-3 text-left">Description</th>

                <th className="p-3 text-left">Stock</th>

                <th className="p-3 text-left">Price</th>

                <th className="p-3 text-left">Category</th>

                <th className="p-3 text-center" colSpan={2}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((val) => {
                return (
                  <tr key={val._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{val.title}</td>

                    <td className="p-3">{val.description}</td>

                    <td className="p-3">{val.stock}</td>

                    <td className="p-3">${val.price}</td>

                    <td className="p-3">{val.category}</td>

                    <td className="p-3">
                      <Link
                        to={`/admin/products/update/${val._id}`}
                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                      >
                        Edit
                      </Link>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => deleteProduct(val._id)}
                        className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ListProduct;
