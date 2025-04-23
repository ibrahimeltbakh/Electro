import { useQuery } from "@tanstack/react-query";
import { GetWishListProducts } from "./wishListFunctions";

const useGetWishList = () => {
  const response = useQuery({
    queryKey: ["wishlist"],
    queryFn: GetWishListProducts,
    staleTime: 60000,
    cacheTime: 300000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 2,
    keepPreviousData: true,
    select: (data) => {
      if (!data || !data.wishlist) {
        return { wishlist: { products: [] }, count: 0 };
      }
      return data;
    },
  });

  return response;
};

export default useGetWishList;
