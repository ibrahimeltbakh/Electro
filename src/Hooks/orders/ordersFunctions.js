import api from "@/lib/axios";

const getToken = () => {
    return (
        localStorage.getItem("token")
    );
};


export const GetOrders = async () => {
    const response = await api.get("/orders", {
        headers: { token: getToken() },
    });
    return response.data;
};

export const removeOrder = async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`, {
        headers: { token: getToken() },
    });
    return response.data;
}



// export const addtoOrders = async (order) => {
//     const response = await api.post("/orders", {
//         headers: { token: getToken() },
//     });
//     return response.data;
// };

