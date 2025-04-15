import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "@/lib/axios";

const useCart = () => {
  const token = localStorage.getItem("userToken");
  const fetchCartProducts = async () => {
    const response = await axios.get(`${api}/cart`, {
      headers: {
        token,
      },
    });
    return response.data;
  };
  const cartProducts = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartProducts,
    refetchInterval: 1000,
    staleTime: 5000,
  });
  return cartProducts;
};

export default useCart;
