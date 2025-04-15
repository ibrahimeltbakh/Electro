import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetData = () => {
  const fetchWishList = async () => {
    const token = localStorage.getItem("userToken");
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: { token },
      }
    );
    return res.data;
  };
  const response = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishList,
    staleTime: 5000,
  });

  return response;
};

export default useGetData;
