import api from "@/lib/axios";
import toast from "react-hot-toast";
const getToken = () => {
    return (
        localStorage.getItem("token"));
};

export const GetWishListProducts = async () => {
    const response = await api.get(
        "/wishlist",
        {
            headers: { token: getToken() },
        }
    );
    return response.data;
};


export const addtoWishlist = async (productId) => {
    const token = getToken();
    if (!token) {
        toast.error("You must be logged in.");
        throw new Error("You must be logged in.");
    }
    const response = await api.post(
        "/wishList",
        { productId },
        {
            headers: { token: token },
        }
    );
    return response.data;
};

export const removeFromWishlist = async (productId) => {
    const response = await api.delete(`/wishList/${productId}`, {
        headers: { token: getToken() },
    });
    return response.data;
};



export const clearWishlist = async () => {
    const response = await api.put(
        "/wishList",
        {},
        {
            headers: { token: getToken() },
        }
    );
    return response.data;
};
