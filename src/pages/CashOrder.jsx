import React, { useState } from "react";
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useGetCart from "@/Hooks/cart/useGetCart";
export default function CashOrder() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useGetCart();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 11 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const sendOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!data || !data.cart) {
      toast.error("Cart is empty!");
      return;
    }

    setIsLoading(true);
    try {
      console.log(data.cart._id);
      const response = await api.post(
        `/orders/${data.cart._id}`,
        {
          shoppingAddress: formData,
        },
        {
          headers: {
            token,
          },
        }
      );
      toast.success("Order placed successfully! ");
      navigate("/profile/orders");
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!data || !data.cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-600">Loading cart info... 🛒</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  from-blue-50 via-white to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-800">Cash Order</h2>
          <p className="mt-2 text-gray-500">Fill in your delivery details </p>
        </div>

        <form onSubmit={sendOrder} className="space-y-6">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Example: Cairo"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              type="text"
              name="street"
              id="street"
              value={formData.street}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.street ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Example: Street of the sky"
            />
            {errors.street && (
              <p className="mt-1 text-sm text-red-600">{errors.street}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Example: 05XXXXXXXXX"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-md text-white font-bold shadow-md transition-all duration-300 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}>
            {isLoading ? "Placing Order..." : "Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
