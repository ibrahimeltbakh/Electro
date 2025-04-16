import api from "@/lib/axios";

 const GetCategories = async () => {
   
    const response = await api.get("/categories", {
    
    });
    return response.data;  
};

export default GetCategories;