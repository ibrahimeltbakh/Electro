import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProduct } from "./ProductsFunctions";
import toast from "react-hot-toast";

const useRemoveProduct = () => {
    const query = useQueryClient();

    const mutate = useMutation({
        mutationFn: ({ productId }) => removeProduct(productId),
        onSuccess: () => {
            query.invalidateQueries(["products"]);
            toast.success("Product removed successfully ✅");
        },
        onError: (error) => {
            console.error("Error removing product:", error);
            toast.error("Failed to remove product ❌");
        }
    });
    return mutate;
}

export default useRemoveProduct