import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { clearCart } from "./cartFunctions"

const useClearCart = () => {
    const query = useQueryClient();

    const mutation = useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            query.invalidateQueries(["cart"]);
            toast.success("Cart cleared successfully ✅");
        },
        onError: (error) => {
            console.error("Error clearing cart:", error);
            toast.error("Failed to clear cart ❌");
        },
    })
    return mutation
}

export default useClearCart