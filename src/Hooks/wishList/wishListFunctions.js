import api from "@/lib/axios";

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
    const response = await api.post(
        "/wishList",
        { productId },
        {
            headers: { token: getToken() },
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
