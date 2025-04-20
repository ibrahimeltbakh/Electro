import api from "@/lib/axios";
const getToken = () => {
    return localStorage.getItem("token");
}

const GetCategories = async () => {

    const response = await api.get("/categories", {

    });
    return response.data;
};



export const GetSpacificCategory = async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}`, {
        headers: { token: getToken() },
    });

    return response.data;
};


export default GetCategories;