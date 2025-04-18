import api from "@/lib/axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const GetProducts = async () => {
    const response = await api.get("/products", {

    });
    return response.data;

};


export const GetProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

