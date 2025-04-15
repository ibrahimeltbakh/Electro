import api from "@/lib/axios";
import axios from "axios";

export const GetCartProducts = async () => {
    const token = localStorage.getItem("userToken");
    const response = await axios.get(`${api}/cart`, {
        headers: {
            token,
        },
    });
    return response.data;
};

export const addtoCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.post(`${api}/cart`, { productId }, {
        headers: {
            token,
        },
    });
    return response.data;
}

export const removeFromCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.delete(`${api}/cart/${productId}`, {
        headers: {
            token,
        },
    });
    return response.data;
}

export const updateCart = async (productId, quantity) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.put(`${api}/cart`, { productId, quantity }, {
        headers: {
            token,
        },
    });
    return response.data;
}

export const clearCart = async () => {
    const token = localStorage.getItem("userToken");
    const response = await axios.put(`${api}/cart`, {
        headers: {
            token,
        },
    });
    return response.data;
}