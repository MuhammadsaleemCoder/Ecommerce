import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Checkout() {
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [address, setAddress] = useState([]);

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {
      const res = await api.get(`/address/${userId}`);
      setAddress(res.data.address);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    try {
      await api.post("/address", {
        userId,
        ...form,
      });

      alert("Address Saved");

      setForm({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pinCode: "",
      });

      loadAddress();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-8">
      {/* Address Form */}
      <div className="shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-5">Shipping Address</h2>

        <form onSubmit={saveAddress} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="addressLine"
            placeholder="Address"
            value={form.addressLine}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={form.pinCode}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button className="w-full bg-black text-white py-3 rounded">
            Save Address
          </button>
        </form>
      </div>

      {/* Saved Address */}
      <div className="shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-5">Saved Address</h2>

        {address.length === 0 ? (
          <p>No Address Found</p>
        ) : (
          address.map((item) => (
            <div key={item._id} className="border rounded p-4 mb-4">
              <h3 className="font-bold">{item.fullName}</h3>

              <p>{item.phone}</p>

              <p>{item.addressLine}</p>

              <p>
                {item.city}, {item.state}
              </p>

              <p>{item.pinCode}</p>

              <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded">
                Deliver Here
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
