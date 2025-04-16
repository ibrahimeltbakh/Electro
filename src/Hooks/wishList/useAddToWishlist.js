import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addtoWishlist } from "./wishListFunctions";
import toast from "react-hot-toast";

const useAddToWishlist = () => {
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ productId }) => addtoWishlist(productId),
    onSuccess: () => {
      query.invalidateQueries(["wishlist"]);
      toast.success("Item added to wishlist ✅");
    },
    onError: (error) => {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add item to wishlist ❌");
    },
  });

  return mutation;
};

export default useAddToWishlist;
