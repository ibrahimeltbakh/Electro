import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeFromCart from "./cartFunctions";
import toast from "react-hot-toast";

const useRemoveFromCart = () => {
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      query.invalidateQueries(["cart"]);
      toast.success("Item removed from cart ✅");
    },
    onError: (error) => {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item ❌");
    },
  });

  return mutation;
};

export default useRemoveFromCart;
