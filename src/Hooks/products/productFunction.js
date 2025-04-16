import api from "@/lib/axios";

export const GetProducts = async () => {
    const response = await api.get("/products", {

    });
    console.log(response.data);
    return response.data;

};
// GetProducts();
// export const GetProductById = async (id) => {
//     const response = await api.get(`/products/${id}`);
//     return response.data;
// };

