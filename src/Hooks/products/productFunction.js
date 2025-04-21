import api from "@/lib/axios";


const getToken = () => {
    return localStorage.getItem("token");
}

export const GetProducts = async () => {
    const res1 = await api.get("/products?page=1");
    const data1 = res1.data;
    const res2 = await api.get("/products?page=2");
    const data2 = res2.data;
    const combinedProducts = [...data1.products, ...data2.products];
    return {
        products: combinedProducts,
        total: data1.totalProducts + data2.totalProducts,
    };
};



export const GetSpacificProduct = async (productId) => {
    const response = await api.get(`/products/${productId}`, {
        headers: { token: getToken() },
    });

    return response.data;
};

