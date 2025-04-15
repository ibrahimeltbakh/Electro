import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const useDeleteData = () => {
  const queryClient = useQueryClient();
  const removeFromWishList = async (id) => {
    const token = localStorage.getItem("userToken");
    const res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token,
        },
      }
    );
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: removeFromWishList,
    onSuccess: () => {
      queryClient.invalidateQueries("wishlist");
    },
    onError: (error) => {
      console.error("Error adding to wishlist:", error);
    },
  });

  return mutation;
};

export default useDeleteData;
