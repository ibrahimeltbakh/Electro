import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWishlist } from "./wishListFunctions";
import toast from "react-hot-toast";

const useRemoveFromWishlist = () => {
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ productId }) => removeFromWishlist(productId),
    onSuccess: () => {
      query.invalidateQueries(["wishlist"]);
      toast.success("Item removed from wishlist ✅");
    },
    onError: (error) => {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item ❌");
    },
  });

  return mutation;
};

export default useRemoveFromWishlist;
