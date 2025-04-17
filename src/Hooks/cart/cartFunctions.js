import api from "@/lib/axios";

const getToken = () => {
    return (
        localStorage.getItem("token") 
        // ||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZlYWIzY2FhODQxYWVmMjAyYWZiNTYiLCJlbWFpbCI6ImhlbWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ3NDMyNTV9.W_g01fxCrXHxiTFHV1jArSvaVHG8dCvlEv1jGtOYme8"
    );
};

export const GetCartProducts = async () => {
    const response = await api.get("/cart", {
        headers: { token: getToken() },
    });
    return response.data;
};

export const addtoCart = async (productId) => {
    const response = await api.post(
        "/cart",
        { productId },
        {
            headers: { token: getToken() },
        }
    );
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await api.delete(`/cart/${productId}`, {
        headers: { token: getToken() },
    });
    return response.data;
};

export const updateCart = async (productId, quantity) => {
    if (!productId || quantity < 1) {
        throw new Error("Invalid productId or quantity");
    }

    const response = await api.put(
        `/cart/${productId}`,
        { quantity },
        {
            headers: { token: getToken() },
        }
    );
    return response.data;
};

export const clearCart = async () => {
    const response = await api.put(
        "/cart",
        {},
        {
            headers: { token: getToken() },
        }
    );
    return response.data;
};
