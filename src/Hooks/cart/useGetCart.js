import { useQuery } from "@tanstack/react-query";
import GetCartProducts from "./cartFunctions";

const useGetCart = () => {
  const cartProducts = useQuery({
    queryKey: ["cart"],
    queryFn: GetCartProducts,
    refetchInterval: 1000,
    staleTime: 5000,
  });
  return cartProducts;
};

export default useGetCart;
