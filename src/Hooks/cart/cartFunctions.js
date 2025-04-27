import api from "@/lib/axios";
import toast from "react-hot-toast";

const getToken = () => {
    return (
        localStorage.getItem("token")
    );
};

export const GetCartProducts = async () => {
    const response = await api.get("/cart", {
        headers: { token: getToken() },
    });
    return response.data;
};

export const addtoCart = async (productId) => {
    const token = getToken();
    if (!token) {
        toast.error("You must be logged in.");
        throw new Error("You must be logged in.");
    }
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
