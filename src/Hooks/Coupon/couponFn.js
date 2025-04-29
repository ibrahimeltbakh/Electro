import api from "@/lib/axios";
const getToken = () => {
    return localStorage.getItem("token");
}

export const GetSpecificCoupon = async (couponId) => {
    const response = await api.get(`/coupons/${couponId}`, {
        headers: { token: getToken() },
    });

    return response.data;
};

