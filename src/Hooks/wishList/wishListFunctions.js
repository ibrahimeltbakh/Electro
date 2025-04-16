import api from "@/lib/axios";

const getToken = () => {
    return (
        localStorage.getItem("userToken") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZlYWIzY2FhODQxYWVmMjAyYWZiNTYiLCJlbWFpbCI6ImhlbWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ3NDMyNTV9.W_g01fxCrXHxiTFHV1jArSvaVHG8dCvlEv1jGtOYme8"
    );
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
