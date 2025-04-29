import api from "@/lib/axios";

const getToken = () => {
    return localStorage.getItem("token");
};
const token = getToken();

export const getCoupons = async () => {
    const response = await api.get("/coupons", {
        headers: { token: token },
    });
    return response.data;
};



export const addCoupon = async (couponData) => {
    const response = await api.post("/coupons", couponData, {
        headers: {
            token: token,
            "Content-Type": "application/json",
        },

    });
    return response;
}

export const updateCoupon = async (couponId, couponData) => {

    const response = await api.put(`/coupons/${couponId}`, couponData, {
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const removeCoupon = async (couponId) => {
    const response = await api.delete(`/coupons/${couponId}`, {
        headers: { token: token },
    });
    return response.data;
}
