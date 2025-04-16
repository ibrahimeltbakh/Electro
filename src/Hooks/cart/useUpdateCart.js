import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateCart } from "./cartFunctions";
import toast from "react-hot-toast";


const useUpdateCart = () => {
    const query = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ productId, quantity }) => updateCart(productId, quantity),
        onSuccess: () => {
            query.invalidateQueries(["cart"]);
            toast.success("Item updated successfully ✅");
        },
        onError: (error) => {
            console.error("Error updating to cart:", error);
            toast.error("Failed to update item to cart ❌");
        },
    });
    return mutation

}

export default useUpdateCart;