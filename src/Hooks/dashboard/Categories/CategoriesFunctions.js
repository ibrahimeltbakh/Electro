import api from "@/lib/axios";

const getToken = () => {
    return localStorage.getItem("token");
};

export const addCategory = async ({ name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    const response = await api.post("/categories", formData, {
        headers: { token: getToken() },
    });

    return response.data;
};

export const updateCategory = async ({ categoryId, name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image); // optional

    const response = await api.put(`/categories/${categoryId}`, formData, {
        headers: { token: getToken() },
    });

    return response.data;
};

export const removeCategory = async (categoryId) => {
    const response = await api.delete(`/categories/${categoryId}`, {
        headers: { token: getToken() },
    });

    return response.data;
};
