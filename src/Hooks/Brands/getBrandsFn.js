import api from "@/lib/axios";

 const GetBrands = async () => {
   
    const response = await api.get("/brands", {
    
    });
    return response.data;  
};


export const GetBrandById = async (id) => {
    const response = await api.get(`/brands/${id}`);
    return response.data;
};



export default GetBrands;