import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const usePostData = () => {
  const queryClient = useQueryClient();
  const addToWishList = async (id) => {
    const token = localStorage.getItem("userToken");
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      {
        headers: {
          token,
        },
      }
    );
    return res.data;
  };
  const mutation = useMutation({
    mutationFn: addToWishList,
    onSuccess: () => {
      queryClient.invalidateQueries("wishlist");
    },
    onError: (error) => {
      console.error("Error adding to wishlist:", error);
    },
  });

  return mutation;
};

export default usePostData;
