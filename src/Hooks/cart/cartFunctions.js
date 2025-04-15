import api from "@/lib/axios";

export const GetCartProducts = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZlYWIzY2FhODQxYWVmMjAyYWZiNTYiLCJlbWFpbCI6ImhlbWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ3NDMyNTV9.W_g01fxCrXHxiTFHV1jArSvaVHG8dCvlEv1jGtOYme8"
    const response = await api.get("/cart", {
        headers: { token },
    });
    return response.data;
};

export const addtoCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    const response = await api.post(
        "/cart",
        { productId },
        {
            headers: { token },
        }
    );
    return response.data;
};

export const removeFromCart = async (productId) => {
    // const token = localStorage.getItem("userToken");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZlYWIzY2FhODQxYWVmMjAyYWZiNTYiLCJlbWFpbCI6ImhlbWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ3NDMyNTV9.W_g01fxCrXHxiTFHV1jArSvaVHG8dCvlEv1jGtOYme8"
    const response = await api.delete(`/cart/${productId}`, {
        headers: { token },
    });
    return response.data;
};

export const updateCart = async (productId, quantity) => {
    const token = localStorage.getItem("userToken");
    const response = await api.put(
        "/cart",
        { productId, quantity },
        {
            headers: { token },
        }
    );
    return response.data;
};

export const clearCart = async () => {
    const token = localStorage.getItem("userToken");
    const response = await api.put(
        "/cart/clear", // تأكد إن الـ endpoint ده صحيح حسب الـ API
        {},
        {
            headers: { token },
        }
    );
    return response.data;
};
