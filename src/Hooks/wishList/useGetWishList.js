import { useQuery } from "@tanstack/react-query";
import { GetWishListProducts } from "./wishListFunctions";

const useGetWishList = () => {

  const response = useQuery({
    queryKey: ["wishlist"],
    queryFn: GetWishListProducts,
    staleTime: 5000,
  });

  return response;
};

export default useGetWishList;
