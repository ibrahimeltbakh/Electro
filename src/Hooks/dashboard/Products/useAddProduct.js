import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "./ProductsFunctions";
import toast from "react-hot-toast";


const useAddProduct = () => {
    const query = useQueryClient();

    const mutation = useMutation({
        mutationFn: (productData) => addProduct(productData),
        onSuccess: () => {
            query.invalidateQueries(["products"]);
            toast.success("Product added successfully ✅");
        },
        onError: (error) => {
            console.error("Error adding product:", error);
            toast.error("Failed to add product ❌");
        },
    });

    return mutation
}
export default useAddProduct

