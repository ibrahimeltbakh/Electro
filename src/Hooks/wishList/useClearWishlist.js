import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { clearWishlist } from "./wishListFunctions"

const useClearWishlist = () => {
    const query = useQueryClient();

    const mutation = useMutation({
        mutationFn: clearWishlist,
        onSuccess: () => {
            query.invalidateQueries(["wishlist"]);
            toast.success("wishlist cleared successfully ✅");
        },
        onError: (error) => {
            console.error("Error clearing wishlist:", error);
            toast.error("Failed to clear wishlist ❌");
        },
    })
    return mutation
}

export default useClearWishlist