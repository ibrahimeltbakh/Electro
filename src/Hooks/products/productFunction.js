import api from "@/lib/axios";

const getToken = () => {
    return localStorage.getItem("token");
}
export const GetProducts = async () => {
    const response = await api.get("/products", {

    });
    return response.data;

};

export const GetSpacificProduct = async (productId) => {
    const response = await api.get(`/products/${productId}`, {
        headers: { token: getToken() },
    });
    return response.data;
};

