import api from "@/lib/axios";

const getToken = () => {
    return localStorage.getItem("token");
};

export const addBrand = async ({ name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    const response = await api.post("/brands", formData, {
        headers: { token: getToken() },
    });

    return response.data;
};

export const updateBrand = async ({ brandId, name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    const response = await api.put(`/brands/${brandId}`, formData, {
        headers: { token: getToken() },
    });

    return response.data;
};

export const removeBrand = async (brandId) => {
    const response = await api.delete(`/brands/${brandId}`, {
        headers: { token: getToken() },
    });

    return response.data;
};
