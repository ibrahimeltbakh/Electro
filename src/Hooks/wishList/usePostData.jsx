import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "@/lib/axios";

const usePostData = () => {


  const queryClient = useQueryClient();
  const addToWishList = async (id) => {
    // const token = localStorage.getItem("userToken");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZlYWIzY2FhODQxYWVmMjAyYWZiNTYiLCJlbWFpbCI6ImhlbWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ3NDMyNTV9.W_g01fxCrXHxiTFHV1jArSvaVHG8dCvlEv1jGtOYme8"
    const res = await api.post(
      `/wishlist`,
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
