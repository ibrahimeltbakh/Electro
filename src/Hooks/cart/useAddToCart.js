import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addtoCart } from "./cartFunctions";
import toast from "react-hot-toast";

const useAddToCart = () => {
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: addtoCart,
    onSuccess: () => {
      query.invalidateQueries(["cart"]);
      toast.success("Item added to cart ✅");
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart ❌");
    },
  });

  return mutation;
};

export default useAddToCart;
