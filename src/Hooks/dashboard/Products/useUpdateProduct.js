import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "./ProductsFunctions";
import toast from "react-hot-toast";

const useUpdateProduct = () => {
    const query = useQueryClient();

    const mutation = useMutation({
        mutationFn: (productData) => updateProduct(productData),
        onSuccess: () => {
            query.invalidateQueries(["products"]);
            toast.success("Product updated successfully ✅");
        },
        onError: (error) => {
            console.error("Error updating product:", error);
            toast.error("Failed to update product ❌");
        },
    });
    return mutation
};
export default useUpdateProduct;